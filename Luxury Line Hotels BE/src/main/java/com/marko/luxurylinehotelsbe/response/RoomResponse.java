package com.marko.luxurylinehotelsbe.response;

import lombok.Data;
import lombok.NoArgsConstructor;
import org.apache.tomcat.util.codec.binary.Base64;
import java.math.BigDecimal;
import java.util.Collections;
import java.util.List;

@Data
@NoArgsConstructor
public class RoomResponse {

    private Long roomId;

    private String hotelName;

    private String roomType;

    private BigDecimal roomPrice;

    private boolean isBooked = false;

    private List<String> photos;

    private List<BookingResponse> bookings;

    public RoomResponse(Long roomId, String hotelName, String roomType, BigDecimal roomPrice) {
        this.roomId = roomId;
        this.hotelName = hotelName;
        this.roomType = roomType;
        this.roomPrice = roomPrice;
    }

    public RoomResponse(Long roomId, String hotelName, String roomType, BigDecimal roomPrice, boolean isBooked, byte[] photoBytes) {
        this.roomId = roomId;
        this.hotelName = hotelName;
        this.roomType = roomType;
        this.roomPrice = roomPrice;
        this.isBooked = isBooked;
        this.photos = photoBytes != null ? Collections.singletonList(Base64.encodeBase64String(photoBytes)) : null;
    }
}