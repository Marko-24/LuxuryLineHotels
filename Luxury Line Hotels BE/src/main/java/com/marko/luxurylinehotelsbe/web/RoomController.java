package com.marko.luxurylinehotelsbe.web;

import com.marko.luxurylinehotelsbe.exceptions.PhotoRetrievalException;
import com.marko.luxurylinehotelsbe.exceptions.RoomNotFoundException;
import com.marko.luxurylinehotelsbe.model.Room;
import com.marko.luxurylinehotelsbe.model.RoomPhoto;
import com.marko.luxurylinehotelsbe.response.RoomResponse;
import com.marko.luxurylinehotelsbe.service.RoomService;
import lombok.RequiredArgsConstructor;
import org.apache.tomcat.util.codec.binary.Base64;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.multipart.MultipartFile;
import java.io.IOException;
import java.math.BigDecimal;
import java.sql.Blob;
import java.sql.SQLException;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

@RestController
@RequiredArgsConstructor
@RequestMapping("/rooms")
public class RoomController {

    private final RoomService roomService;

    @GetMapping("/all-rooms")
    public ResponseEntity<List<RoomResponse>> getAllRooms() throws SQLException {
        List<Room> rooms = roomService.getAllRooms();
        List<RoomResponse> roomResponses = new ArrayList<>();
        for (Room room : rooms) {
            RoomResponse roomResponse = getRoomResponse(room);
            List<String> base64Photos = new ArrayList<>();
            for (RoomPhoto photo : room.getPhotos()) {
                if (photo.getPhoto() != null) {
                    byte[] photoBytes = photo.getPhoto().getBytes(1, (int) photo.getPhoto().length());
                    base64Photos.add(Base64.encodeBase64String(photoBytes));
                }
            }
            roomResponse.setPhotos(base64Photos);
            roomResponses.add(roomResponse);
        }
        return ResponseEntity.ok(roomResponses);
    }

    @GetMapping("/available-rooms")
    public ResponseEntity<List<RoomResponse>> getAvailableRooms(
            @RequestParam("checkInDate") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate checkInDate,
            @RequestParam("checkOutDate") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)LocalDate checkOutDate,
            @RequestParam("roomType") String roomType,
            @RequestParam("hotelName") String hotelName) throws SQLException {
        List<Room> availableRooms = roomService.getAvailableRooms(checkInDate, checkOutDate, roomType, hotelName);
        List<RoomResponse> roomResponses = new ArrayList<>();
        for (Room room : availableRooms) {
            byte[] photoBytes = roomService.getRoomPhotoByRoomId(room.getRoomId());
            if (photoBytes != null && photoBytes.length > 0) {
                String photoBase64 = Base64.encodeBase64String(photoBytes);
                RoomResponse roomResponse = getRoomResponse(room);
                roomResponse.setPhotos(Collections.singletonList(photoBase64));
                roomResponses.add(roomResponse);
            }
        }
        if(roomResponses.isEmpty()) {
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.ok(roomResponses);
        }
    }

    @GetMapping("/room/{roomId}")
    public ResponseEntity<Optional<RoomResponse>> getRoomById(@PathVariable Long roomId) {
        Optional<Room> theRoom = roomService.getRoomById(roomId);
        return theRoom.map(room -> {
            RoomResponse roomResponse = getRoomResponse(room);
            List<String> base64Photos = new ArrayList<>();

            for (RoomPhoto photo : room.getPhotos()) {
                if (photo.getPhoto() != null) {
                    byte[] photoBytes;
                    try {
                        photoBytes = photo.getPhoto().getBytes(1, (int) photo.getPhoto().length());
                    } catch (SQLException e) {
                        throw new RuntimeException(e);
                    }
                    base64Photos.add(Base64.encodeBase64String(photoBytes));
                }
            }

            roomResponse.setPhotos(base64Photos);
            return ResponseEntity.ok(Optional.of(roomResponse));
        }).orElseThrow(() -> new RoomNotFoundException("Couldn't find room."));
    }

    @GetMapping("/roomTypes")
    public List<String> getRoomTypes() {
        return roomService.getAllRoomTypes();
    }

    @GetMapping("/hotelNames")
    public List<String> getHotelNames() {
        return roomService.getAllHotelNames();
    }

    @PostMapping("/add")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<RoomResponse> addRoom(@RequestParam("photos") List<MultipartFile> photos,
                                                @RequestParam("hotelName") String hotelName,
                                                @RequestParam("roomType") String roomType,
                                                @RequestParam("roomPrice") BigDecimal roomPrice) throws SQLException, IOException {
        Room newRoom = roomService.addRoom(photos, hotelName, roomType, roomPrice);
        RoomResponse response = new RoomResponse(newRoom.getRoomId(), newRoom.getHotelName(), newRoom.getRoomType(), newRoom.getRoomPrice());
        return ResponseEntity.ok(response);
    }

    @PutMapping("/update/{roomId}")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<RoomResponse> updateRoom(@PathVariable Long roomId,
                                                   @RequestParam(required = false) String roomType,
                                                   @RequestParam(required = false) BigDecimal roomPrice,
                                                   @RequestParam(value = "photos", required = false) List<MultipartFile> photos) throws IOException, SQLException {
        Room updatedRoom = roomService.updateRoom(roomId, roomType, roomPrice, photos);
        RoomResponse response = new RoomResponse(updatedRoom.getRoomId(), updatedRoom.getHotelName(), updatedRoom.getRoomType(), updatedRoom.getRoomPrice());
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/delete/room/{roomId}")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<Void> deleteRoom(@PathVariable Long roomId) {
        roomService.deleteRoom(roomId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    private RoomResponse getRoomResponse(Room room) {
        byte[] photoBytes = null;
        Blob photoBlob = room.getPhotos().isEmpty() ? null : room.getPhotos().get(0).getPhoto();
        if(photoBlob != null) {
            try {
                photoBytes = photoBlob.getBytes(1, (int)photoBlob.length());
            } catch(SQLException e) {
                throw new PhotoRetrievalException("Couldn't retrieve photo.");
            }
        }
        return new RoomResponse(room.getRoomId(),
                                room.getHotelName(),
                                room.getRoomType(),
                                room.getRoomPrice(),
                                room.isBooked(),
                                photoBytes);
    }
}