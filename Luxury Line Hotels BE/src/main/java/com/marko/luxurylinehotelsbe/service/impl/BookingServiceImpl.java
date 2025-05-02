package com.marko.luxurylinehotelsbe.service.impl;

import com.marko.luxurylinehotelsbe.exceptions.InternalServerException;
import com.marko.luxurylinehotelsbe.exceptions.InvalidBookingRequestException;
import com.marko.luxurylinehotelsbe.model.Booking;
import com.marko.luxurylinehotelsbe.model.Room;
import com.marko.luxurylinehotelsbe.repository.BookingRepository;
import com.marko.luxurylinehotelsbe.service.BookingService;
import com.marko.luxurylinehotelsbe.service.EmailService;
import com.marko.luxurylinehotelsbe.service.RoomService;
import jakarta.mail.MessagingException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;

@RequiredArgsConstructor
@Service
public class BookingServiceImpl implements BookingService {

    private final BookingRepository bookingRepository;
    private final RoomService roomService;
    private final EmailService emailService;

    @Override
    public List<Booking> getAllBookings() {
        return bookingRepository.findAll();
    }

    @Override
    public Booking findByBookingConfirmationCode(String confirmationCode) {
        return bookingRepository.findByBookingConfirmationCode(confirmationCode).orElseThrow(
                () -> new InternalServerException("Booking with confirmation code " + confirmationCode + " doesn't exist."));
    }

    @Override
    public List<Booking> getBookingsByUserEmail(String email) {
        return bookingRepository.findByGuestEmail(email);
    }

    @Override
    public String saveBooking(Long roomId, Booking bookingRequest) throws MessagingException {
      if (bookingRequest.getCheckOutDate().isBefore(bookingRequest.getCheckInDate())) {
         throw new InvalidBookingRequestException("Check-In date must come before Check-Out date.");
      }
      Room room = roomService.getRoomById(roomId).orElseThrow(() -> new InternalServerException("Room not found"));
      List<Booking> bookings = room.getBookings();
      boolean roomIsAvailable = roomIsAvailable(bookingRequest, bookings);

      if (roomIsAvailable) {
        room.addBooking(bookingRequest);
        bookingRepository.save(bookingRequest);

        String emailBody = "Dear " + bookingRequest.getGuestFullName() + ",<br>" +
                           "Your reservation is complete. The confirmation code is: " +
                           "<b>" + bookingRequest.getBookingConfirmationCode() + "</b>.<br>" +
                           "Thank you for choosing us!";
        emailService.sendConfirmationEmail(bookingRequest.getGuestEmail(), "Booking Confirmation", emailBody);
      } else {
        throw new InvalidBookingRequestException("Sorry, the selected dates have already been booked." +
                                                 " Please try selecting different ones.");
      }
      return bookingRequest.getBookingConfirmationCode();
    }

    @Override
    public void cancelBooking(Long bookingId) {
        bookingRepository.deleteById(bookingId);
    }

    private boolean roomIsAvailable(Booking bookingRequest, List<Booking> bookings) {
      return bookings.stream()
                     .noneMatch(booking -> bookingRequest.getCheckInDate().equals(booking.getCheckInDate())
                                        || bookingRequest.getCheckOutDate().isBefore(booking.getCheckOutDate())
                                        || (bookingRequest.getCheckInDate().isAfter(booking.getCheckInDate())
                                        && bookingRequest.getCheckInDate().isBefore(booking.getCheckOutDate()))
                                        || (bookingRequest.getCheckInDate().isBefore(booking.getCheckInDate())

                                        && bookingRequest.getCheckOutDate().equals(booking.getCheckOutDate()))
                                        || (bookingRequest.getCheckInDate().isBefore(booking.getCheckInDate())

                                        && bookingRequest.getCheckOutDate().isAfter(booking.getCheckOutDate()))

                                        || (bookingRequest.getCheckInDate().equals(booking.getCheckOutDate())
                                        && bookingRequest.getCheckOutDate().equals(booking.getCheckInDate()))

                                        || (bookingRequest.getCheckInDate().equals(booking.getCheckOutDate())
                                        && bookingRequest.getCheckOutDate().equals(bookingRequest.getCheckInDate()))
                     );
    }
}