package com.marko.luxurylinehotelsbe.service.impl;

import com.marko.luxurylinehotelsbe.exceptions.UserAlreadyExistsException;
import com.marko.luxurylinehotelsbe.model.Role;
import com.marko.luxurylinehotelsbe.model.User;
import com.marko.luxurylinehotelsbe.repository.RoleRepository;
import com.marko.luxurylinehotelsbe.repository.UserRepository;
import com.marko.luxurylinehotelsbe.service.UserService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import java.io.File;
import java.io.IOException;
import java.util.Collections;
import java.util.List;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final RoleRepository roleRepository;

    private static final String UPLOAD_DIR = "C:/Users/Marko/Desktop/Marko/Work/Luxury Line Hotels/Luxury Line Hotels BE/src/main/resources/profile-pictures/";
    private static final String BASE_URL = "https://localhost:8443/photos/profile-pictures/";

    @Override
    public User getUserByEmail(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));
        System.out.println("Stored profile picture in DB: " + user.getProfilePicture());

        if (user.getProfilePicture() != null) {
            if (!user.getProfilePicture().startsWith("http")) {
                user.setProfilePicture(BASE_URL + user.getProfilePicture());
            } else {
                System.out.println("Profile picture already contains BASE_URL, skipping update.");
            }
        } else {
            System.out.println("User has no profile picture.");
        }
        System.out.println("Final profile picture URL: " + user.getProfilePicture());
        return user;
    }

    @Override
    public List<User> getUsers() {
        return userRepository.findAll();
    }

    @Transactional
    @Override
    public User registerUser(User user, MultipartFile profilePicture) {
        if (userRepository.existsByEmail(user.getEmail())) {
            throw new UserAlreadyExistsException(user.getEmail() + " already exists");
        }
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        Role userRole = roleRepository.findByName("ROLE_USER").orElseThrow(
                () -> new RuntimeException("Default role not found"));
        user.setRoles(Collections.singletonList(userRole));

        if (profilePicture != null && !profilePicture.isEmpty()) {
            File uploadFolder = new File(UPLOAD_DIR);
            if (!uploadFolder.exists()) {
                uploadFolder.mkdirs();
            }
            String filename = user.getEmail() + "_" + profilePicture.getOriginalFilename();
            File destinationFile = new File(UPLOAD_DIR + filename);
            try {
                profilePicture.transferTo(destinationFile);
                user.setProfilePicture(filename);
            } catch (IOException e) {
                throw new RuntimeException("Failed to save profile picture", e);
            }
        }
        return userRepository.save(user);
    }

    @Transactional
    @Override
    public void updateProfilePicture(String email, MultipartFile profilePicture) {
        User user = getUserByEmail(email);
        if (profilePicture != null && !profilePicture.isEmpty()) {
            try {
                String filename = email + "_" + profilePicture.getOriginalFilename();
                File destinationFile = new File(UPLOAD_DIR + filename);
                profilePicture.transferTo(destinationFile);
                user.setProfilePicture(filename);
                userRepository.save(user);
            } catch (IOException e) {
                throw new RuntimeException("Failed to save profile picture", e);
            }
        }
    }

    @Transactional
    @Override
    public void deleteProfilePicture(String email) {
        User user = getUserByEmail(email);
        if (user.getProfilePicture() != null) {
            File file = new File(UPLOAD_DIR + user.getProfilePicture());
            if (file.exists()) {
                file.delete();
            }
            user.setProfilePicture(null);
            userRepository.save(user);
        }
    }

    @Transactional
    @Override
    public void deleteUser(String email) {
        User theUser = getUserByEmail(email);
        if (theUser != null) {
            userRepository.deleteByEmail(email);
        }
    }
}