import axios from "axios";

export const api = axios.create({
    baseURL: "https://localhost:8443"
})

export const getHeader = () => {
    const token = localStorage.getItem("token");
    return {
        Authorization: `Bearer ${token}`
    }
}

export async function addRoom(formData) {
    const response = await api.post("/rooms/add", formData, {
        headers: getHeader()
    });
    return response.status >= 200 && response.status < 300;
}

export async function getHotelNames() {
    try {
        const response = await api.get("/rooms/hotelNames");
        return response.data;
    } catch (error) {
        throw new Error("Couldn't get hotel names.");
    }
}

export async function getRoomTypes() {
    try {
        const response = await api.get("/rooms/roomTypes");
        return response.data;
    } catch (error) {
        throw new Error("Couldn't get rooms types.");
    }
}

export async function getAllRooms() {
    try {
        const result = await api.get("/rooms/all-rooms")
        return result.data
    } catch(error) {
        throw new Error("There aren't any rooms still added to the database.")
    }
}

export async function deleteRoom(roomId) {

    try {
        const result = await api.delete(`/rooms/delete/room/${roomId}`, {
            headers: getHeader()
        })
        return result.data
    } catch(error) {
        throw new Error(`Error deleting room ${error.message}`)
    }
}

export async function updateRoom(roomId, roomData) {
    const formData = new FormData();
    formData.append("roomType", roomData.get("roomType"));
    formData.append("roomPrice", roomData.get("roomPrice"));
    if (roomData.getAll("photos").length > 0) {
        roomData.getAll("photos").forEach((photo) => {
            formData.append("photos", photo);
        });
    }
    return await api.put(`/rooms/update/${roomId}`, formData, {
        headers: {
            "Authorization": getHeader().Authorization,
        },
    });
}

export async function getRoomById(roomId) {
    try {
        const result = await api.get(`/rooms/room/${roomId}`)
        return result.data
    } catch (error) {
        throw new Error(`Error fetching room ${error.message}`)
    }
}

export async function bookRoom(roomId, booking) {
    try {
        const response = await api.post(`/bookings/room/${roomId}/booking`, booking, {
            headers: getHeader()
        })
        return response.data
    } catch (error) {
        if (error.response && error.response.data) {
            throw new Error(error.response.data)
        } else {
            throw new Error(`Error booking room : ${error.message}`)
        }
    }
}

export async function getAllBookings() {
    try {
        const result = await api.get("/bookings/all-bookings", { headers: getHeader() })
        return result.data
    } catch (error) {
        throw new Error(`Couldn't fetch bookings: ${error.message}`)
    }
}

export async function getBookingByConfirmationCode(confirmationCode) {
    try {
        const result = await api.get(`/bookings/confirmation/${confirmationCode}`, {
            headers: getHeader()
        })
        return result.data
    } catch (error) {
        if(error.response && error.response.data) {
            throw new Error(error.response.data)
        }
        else {
            throw new Error(`Couldn't find booking: ${error.message}`)
        }
    }
}

export async function cancelBooking(bookingId) {
    try {
        const result = await api.delete(`/bookings/booking/${bookingId}/delete`, {
            headers: getHeader()
        })
        return result.data
    } catch (error) {
        throw new Error(`An error occurred trying to cancel booking: ${error.message}`)
    }
}

export async function getAvailableRooms(checkInDate, checkOutDate, roomType, hotelName) {
    return await api.get(`rooms/available-rooms?checkInDate=${checkInDate}&checkOutDate=${checkOutDate}&roomType=${roomType}&hotelName=${hotelName}`, {
        headers: getHeader()
    })
}

export async function registerUser(formData) {
    try {
        const response = await api.post("/auth/register-user", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
        return response.data;
    } catch (error) {
        if (error.response && error.response.data) {
            throw new Error(error.response.data);
        } else {
            throw new Error(`User registration error: ${error.message}`);
        }
    }
}

export async function loginUser(login) {
    try {
        const response = await api.post("/auth/login", login, {
            headers: getHeader(),
            withCredentials: true
        })
        if (response.status >= 200 && response.status < 300) {
            return response.data
        } else {
            return null
        }
    } catch (error) {
        console.error(error)
        return null
    }
}

export async function deleteUser(userId) {
    try {
        const response = await api.delete(`/users/delete/${userId}`, {
            headers: getHeader()
        })
        return response.data
    } catch (error) {
        return error.message
    }
}

export async function getUser(userId) {
    try {
        const response = await api.get(`/users/${userId}`, {
            headers: getHeader()
        })
        return response.data
    } catch (error) {
        throw error.message
    }
}

export const updateProfilePicture = async (userId, formData, token) => {
    const response = await fetch(`https://localhost:8443/users/${userId}/profile-picture`, {
        method: "PUT",
        headers: {
            Authorization: `Bearer ${token}`,
        },
        body: formData,
    });

    if (!response.ok) {
        throw new Error("Failed to update profile picture");
    }
}

export const deleteProfilePicture = async (userId, token) => {
    const response = await fetch(`https://localhost:8443/users/${userId}/profile-picture`, {
        method: "DELETE",
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    if (!response.ok) {
        throw new Error("Failed to delete profile picture");
    }
}

export async function getBookingsByUserId(userId) {
    try {
        const response = await api.get(`/bookings/user/${userId}/bookings`, {
            headers: getHeader()
        })
        return response.data
    } catch (error) {
        console.error("Error fetching bookings:", error.message)
        throw new Error("Failed to fetch bookings")
    }
}