package com.marko.luxurylinehotelsbe.service.impl;

import com.marko.luxurylinehotelsbe.exceptions.RoomNotFoundException;
import com.marko.luxurylinehotelsbe.model.Room;
import com.marko.luxurylinehotelsbe.model.RoomPhoto;
import com.marko.luxurylinehotelsbe.repository.RoomRepository;
import com.marko.luxurylinehotelsbe.service.RoomService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import javax.sql.rowset.serial.SerialBlob;
import java.io.IOException;
import java.math.BigDecimal;
import java.sql.Blob;
import java.sql.SQLException;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RequiredArgsConstructor
@Service
public class RoomServiceImpl implements RoomService {

    private final RoomRepository roomRepository;

    @Override
    public List<Room> getAllRooms() {
        return roomRepository.findAll();
    }

    @Override
    public List<Room> getAvailableRooms(LocalDate checkInDate, LocalDate checkOutDate, String roomType, String hotelName) {
        return roomRepository.findAvailableRoomsByDatesAndType(checkInDate, checkOutDate, roomType, hotelName);
    }

    @Override
    public Optional<Room> getRoomById(Long roomId) {
        return Optional.of(roomRepository.findById(roomId).get());
    }

    @Override
    public byte[] getRoomPhotoByRoomId(Long roomId) throws SQLException {
        Optional<Room> theRoom = roomRepository.findById(roomId);
        if(theRoom.isEmpty()) {
            throw new RoomNotFoundException("This room doesn't exist.");
        }
        Blob photoBlob = theRoom.get().getPhotos().isEmpty() ? null : theRoom.get().getPhotos().get(0).getPhoto();
        if(photoBlob != null) {
            return photoBlob.getBytes(1, (int)photoBlob.length());
        }
        return null;
    }

    @Override
    public List<String> getAllRoomTypes() {
        return roomRepository.findDistinctRoomTypes();
    }

    @Override
    public List<String> getAllHotelNames() {
        return roomRepository.findDistinctHotelNames();
    }

    @Override
    public Room addRoom(List<MultipartFile> photos, String hotelName, String roomType, BigDecimal roomPrice) throws SQLException, IOException {
        Room room = new Room();
        room.setHotelName(hotelName);
        room.setRoomType(roomType);
        room.setRoomPrice(roomPrice);
        List<RoomPhoto> photoEntities = new ArrayList<>();

        for (MultipartFile photo : photos) {
            if (!photo.isEmpty()) {
                Blob blob = new SerialBlob(photo.getBytes());
                RoomPhoto roomPhoto = new RoomPhoto();
                roomPhoto.setPhoto(blob);
                roomPhoto.setRoom(room);
                photoEntities.add(roomPhoto);
            }
        }
        room.setPhotos(photoEntities);
        return roomRepository.save(room);
    }

    @Override
    public Room updateRoom(Long roomId, String roomType, BigDecimal roomPrice, List<MultipartFile> photos) throws IOException, SQLException {
        Room room = roomRepository.findById(roomId).orElseThrow(() -> new RoomNotFoundException("Couldn't find room."));
        if (roomType != null) {
            room.setRoomType(roomType);
        }
        if (roomPrice != null) {
            room.setRoomPrice(roomPrice);
        }
        if (photos != null && !photos.isEmpty()) {
            List<RoomPhoto> photoEntities = new ArrayList<>();
            for (MultipartFile photo : photos) {
                if (!photo.isEmpty()) {
                    Blob blob = new SerialBlob(photo.getBytes());
                    RoomPhoto roomPhoto = new RoomPhoto();
                    roomPhoto.setPhoto(blob);
                    roomPhoto.setRoom(room);
                    photoEntities.add(roomPhoto);
                }
            }
            room.getPhotos().clear();
            room.getPhotos().addAll(photoEntities);
        }
        return roomRepository.save(room);
    }

    @Override
    public void deleteRoom(Long roomId) {
        Optional<Room> theRoom = roomRepository.findById(roomId);
        if(theRoom.isPresent()) {
            roomRepository.deleteById(roomId);
        }
    }
}