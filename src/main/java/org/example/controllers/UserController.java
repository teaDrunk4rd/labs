package org.example.controllers;

import org.example.db.entities.User;
import org.example.db.repos.UserRepo;
import org.example.payload.request.UpdateUserRequest;
import org.example.payload.response.JwtResponse;
import org.example.payload.response.MessageResponse;
import org.example.security.JwtUtils;
import org.example.security.UserDetailsGetter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/")
public class UserController {
    @Autowired
    private UserRepo userRepo;
    @Autowired
    private UserDetailsGetter userDetailsGetter;
    @Autowired
    private JwtUtils jwtUtils;
    @Autowired
    private PasswordEncoder encoder;

    @GetMapping("profiles")
    public User show() {
        return userRepo.findById(userDetailsGetter.getUserDetails().getId()).orElse(null);
    }

    @PutMapping("profiles/update")
    public ResponseEntity<?> update(@Valid @RequestBody UpdateUserRequest updateUserRequest) {
        User user = userRepo.findById(userDetailsGetter.getUserDetails().getId()).orElse(null);
        if (user == null) return ResponseEntity.status(404).body("Пользователь не найден");

        String validationMessage = updateUserRequest.validate(userRepo, user, encoder);
        if (validationMessage != null) return ResponseEntity.badRequest().body(new MessageResponse(validationMessage));

        user.setEmail(updateUserRequest.getEmail());
        user.setName(updateUserRequest.getName());
        if (updateUserRequest.getPassword() != null && updateUserRequest.getPassword() != "") {
            user.setPassword(encoder.encode(updateUserRequest.getPassword()));
        }

        userRepo.saveAndFlush(user);

        return ResponseEntity.ok(new JwtResponse(jwtUtils.generateJwtToken(user.getEmail()),
                user.getId(),
                user.getName(),
                user.getEmail(),
                null));
    }
}
