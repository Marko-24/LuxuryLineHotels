package com.marko.luxurylinehotelsbe.web;

import com.marko.luxurylinehotelsbe.exceptions.UserAlreadyExistsException;
import com.marko.luxurylinehotelsbe.model.User;
import com.marko.luxurylinehotelsbe.request.LoginRequest;
import com.marko.luxurylinehotelsbe.response.JwtResponse;
import com.marko.luxurylinehotelsbe.security.jwt.JwtUtils;
import com.marko.luxurylinehotelsbe.security.user.HotelUserDetails;
import com.marko.luxurylinehotelsbe.service.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {
    private final UserService userService;
    private final AuthenticationManager authenticationManager;
    private final JwtUtils jwtUtils;

    @PostMapping(value = "/register-user", consumes = {"multipart/form-data"})
    public ResponseEntity<?> registerUser(
            @RequestParam Map<String, String> userData,
            @RequestPart(value = "profilePicture", required = false) MultipartFile profilePicture) {
        try {
            User user = new User();
            user.setFirstName(userData.get("firstName"));
            user.setLastName(userData.get("lastName"));
            user.setEmail(userData.get("email"));
            user.setPassword(userData.get("password"));

            userService.registerUser(user, profilePicture);
            return ResponseEntity.ok("Registration successful!");
        } catch (UserAlreadyExistsException e) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("An error occurred during registration: " + e.getMessage());
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest request){
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword()));

        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = jwtUtils.generateJwtTokenForUser(authentication);
        HotelUserDetails userDetails = (HotelUserDetails) authentication.getPrincipal();
        List<String> roles = userDetails.getAuthorities().stream().map(GrantedAuthority::getAuthority).toList();

        return ResponseEntity.ok(new JwtResponse(userDetails.getId(), userDetails.getEmail(), jwt, roles));
    }
}