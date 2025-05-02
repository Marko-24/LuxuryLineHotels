package com.marko.luxurylinehotelsbe.service;

import com.marko.luxurylinehotelsbe.model.Room;
import org.springframework.web.multipart.MultipartFile;
import java.io.IOException;
import java.math.BigDecimal;
import java.sql.SQLException;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

public interface RoomService {

    List<Room> getAllRooms();

    List<Room> getAvailableRooms(LocalDate checkInDate, LocalDate checkOutDate, String roomType, String hotelName);

    Optional<Room> getRoomById(Long roomId);

    byte[] getRoomPhotoByRoomId(Long roomId) throws SQLException;

    List<String> getAllRoomTypes();

    List<String> getAllHotelNames();

    Room addRoom(List<MultipartFile> photos, String hotelName, String roomType, BigDecimal roomPrice) throws SQLException, IOException;

    Room updateRoom(Long roomId, String roomType, BigDecimal roomPrice, List<MultipartFile> photos) throws IOException, SQLException;

    void deleteRoom(Long roomId);
}