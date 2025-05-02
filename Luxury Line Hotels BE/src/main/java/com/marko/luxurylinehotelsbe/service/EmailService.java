package com.marko.luxurylinehotelsbe.service;

import jakarta.mail.MessagingException;

public interface EmailService {

    void sendConfirmationEmail(String to, String subject, String text) throws MessagingException;
}
