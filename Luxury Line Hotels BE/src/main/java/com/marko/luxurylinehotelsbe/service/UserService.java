package com.marko.luxurylinehotelsbe.service;

import com.marko.luxurylinehotelsbe.model.User;
import org.springframework.web.multipart.MultipartFile;
import java.util.List;

public interface UserService {

    User getUserByEmail(String email);

    List<User> getUsers();

    User registerUser(User user, MultipartFile profilePicture);

    void updateProfilePicture(String email, MultipartFile profilePicture);

    void deleteProfilePicture(String email);

    void deleteUser(String email);
}