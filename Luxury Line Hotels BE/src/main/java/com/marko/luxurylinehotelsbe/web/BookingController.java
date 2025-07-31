package com.marko.luxurylinehotelsbe.web;

import com.marko.luxurylinehotelsbe.exceptions.InternalServerException;
import com.marko.luxurylinehotelsbe.exceptions.InvalidBookingRequestException;
import com.marko.luxurylinehotelsbe.model.Booking;
import com.marko.luxurylinehotelsbe.model.Room;
import com.marko.luxurylinehotelsbe.response.BookingResponse;
import com.marko.luxurylinehotelsbe.response.RoomResponse;
import com.marko.luxurylinehotelsbe.service.BookingService;
import com.marko.luxurylinehotelsbe.service.RoomService;
import jakarta.mail.MessagingException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import java.util.ArrayList;
import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("/bookings")
public class BookingController {

    private final BookingService bookingService;
    private final RoomService roomService;

    @GetMapping("/all-bookings")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<List<BookingResponse>> getAllBookings() {

        List<Booking> bookings = bookingService.getAllBookings();
        List<BookingResponse> bookingResponses = new ArrayList<>();
        for(Booking booking : bookings){
            BookingResponse bookingResponse = getBookingResponse(booking);
            bookingResponses.add(bookingResponse);
        }
        return ResponseEntity.ok(bookingResponses);
    }

    @GetMapping("/confirmation/{confirmationCode}")
    public ResponseEntity<?> getBookingByConfirmationCode(@PathVariable String confirmationCode) {
        try {
            Booking booking = bookingService.findByBookingConfirmationCode(confirmationCode);
            BookingResponse bookingResponse = getBookingResponse(booking);
            return ResponseEntity.ok(bookingResponse);
        }
        catch (InternalServerException ex) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(ex.getMessage());
        }
    }

    @GetMapping("/user/{email}/bookings")
    public ResponseEntity<List<BookingResponse>> getBookingsByUserEmail(@PathVariable String email) {
        List<Booking> bookings = bookingService.getBookingsByUserEmail(email);
        List<BookingResponse> bookingResponses = new ArrayList<>();
        for (Booking booking : bookings) {
            BookingResponse bookingResponse = getBookingResponse(booking);
            bookingResponses.add(bookingResponse);
        }
        return ResponseEntity.ok(bookingResponses);
    }

    @PostMapping("/room/{roomId}/booking")
    public ResponseEntity<?> saveBooking(@PathVariable Long roomId,
                                         @RequestBody Booking bookingRequest) {
        try {
            bookingService.saveBooking(roomId, bookingRequest);
            return ResponseEntity.ok(
                    "Your reservation is complete, the confirmation code is sent to the provided email address.");
        }
        catch (InvalidBookingRequestException ex) {
            return ResponseEntity.badRequest().body(ex.getMessage());
        } catch (MessagingException e) {
            throw new RuntimeException(e);
        }
    }

    @DeleteMapping("/booking/{bookingId}/delete")
    public void cancelBooking(@PathVariable Long bookingId) {
        bookingService.cancelBooking(bookingId);
    }

    private BookingResponse getBookingResponse(Booking booking) {
        Room theRoom = roomService.getRoomById(booking.getRoom().getRoomId()).get();
        RoomResponse room = new RoomResponse(theRoom.getRoomId(),
                                             theRoom.getHotelName(),
                                             theRoom.getRoomType(),
                                             theRoom.getRoomPrice());
        return new BookingResponse(booking.getBookingId(), booking.getCheckInDate(), booking.getCheckOutDate(),
                                   booking.getGuestFullName(), booking.getGuestEmail(), booking.getNumOfAdults(),
                                   booking.getNumOfChildren(), booking.getNumOfTotalGuests(),
                                   booking.getBookingConfirmationCode(), room);
    }
}