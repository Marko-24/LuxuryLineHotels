package com.marko.luxurylinehotelsbe.service;

import com.marko.luxurylinehotelsbe.model.Booking;
import jakarta.mail.MessagingException;

import java.util.List;

public interface BookingService {

    List<Booking> getAllBookings();

    Booking findByBookingConfirmationCode(String confirmationCode);

    List<Booking> getBookingsByUserEmail(String email);

    String saveBooking(Long roomId, Booking bookingRequest) throws MessagingException;

    void cancelBooking(Long bookingId);
}
