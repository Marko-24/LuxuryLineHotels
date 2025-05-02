package com.marko.luxurylinehotelsbe.exceptions;

public class InvalidBookingRequestException extends RuntimeException{
    public  InvalidBookingRequestException(String message) {
        super(message);
    }
}
