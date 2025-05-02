package com.marko.luxurylinehotelsbe.repository;

import com.marko.luxurylinehotelsbe.model.Room;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import java.time.LocalDate;
import java.util.List;

@Repository
public interface RoomRepository extends JpaRepository<Room, Long> {

    @Query("SELECT DISTINCT room.roomType FROM Room room")
    List<String> findDistinctRoomTypes();

    @Query("SELECT DISTINCT room.hotelName FROM Room room")
    List<String> findDistinctHotelNames();

    @Query(" SELECT room FROM Room room " +
            " WHERE room.roomType LIKE %:roomType% " +
            "AND room.hotelName LIKE %:hotelName% " +
            " AND room.roomId NOT IN (" +
            "  SELECT booking.room.roomId FROM Booking booking " +
            "  WHERE ((booking.checkInDate <= :checkOutDate) AND (booking.checkOutDate >= :checkInDate))" +
            ")")
    List<Room> findAvailableRoomsByDatesAndType(LocalDate checkInDate, LocalDate checkOutDate, String roomType, String hotelName);
}