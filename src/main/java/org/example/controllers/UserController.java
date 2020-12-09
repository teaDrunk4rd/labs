package org.example.controllers;

import org.example.db.entities.Log;
import org.example.db.entities.User;
import org.example.db.repos.LogRepo;
import org.example.db.repos.RoleRepo;
import org.example.db.repos.UserRepo;
import org.example.payload.request.UpdateUserRequest;
import org.example.payload.response.*;
import org.example.security.JwtUtils;
import org.example.security.UserDetailsGetter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.Comparator;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/")
public class UserController {
    @Autowired
    private UserRepo userRepo;
    @Autowired
    private LogRepo logRepo;
    @Autowired
    private RoleRepo roleRepo;
    @Autowired
    private UserDetailsGetter userDetailsGetter;
    @Autowired
    private JwtUtils jwtUtils;
    @Autowired
    private PasswordEncoder encoder;

    @GetMapping("profiles")
    public ProfileResponse show() {
        User user = userRepo.findById(userDetailsGetter.getUserDetails().getId()).orElse(null);
        return new ProfileResponse(user.getEmail(), user.getName(), user.getGroup() != null ? user.getGroup().getName() : null);
    }

    @PutMapping("profiles/update")
    public ResponseEntity<?> update(@Valid @RequestBody UpdateUserRequest updateUserRequest) {
        User user = userRepo.findById(userDetailsGetter.getUserDetails().getId()).orElse(null);

        String validationMessage = updateUserRequest.validate(userRepo, user, encoder);
        if (validationMessage != null) return ResponseEntity.badRequest().body(new MessageResponse(validationMessage));

        user.setEmail(updateUserRequest.getEmail());
        if (user.getRole().getKey() != "ROLE_STUDENT")
            user.setName(updateUserRequest.getName());
        if (updateUserRequest.getPassword() != null && updateUserRequest.getPassword() != "")
            user.setPassword(encoder.encode(updateUserRequest.getPassword()));

        userRepo.saveAndFlush(user);

        return ResponseEntity.ok(new JwtResponse(jwtUtils.generateJwtToken(user.getEmail()),
                user.getId(),
                user.getName(),
                user.getEmail(),
                null));
    }

    @Secured({"ROLE_TEACHER", "ROLE_ADMIN"})
    @GetMapping("students")
    public ResponseEntity<?> getStudents(@RequestParam int logId) {
        User user = userRepo.findById(userDetailsGetter.getUserDetails().getId()).get();
        Log log = logRepo.findById(logId).orElse(null);

        if (log == null) return ResponseEntity.badRequest().build();
        if (log.getTeacher() != user && user.getRole() != roleRepo.findByKey("admin")) return ResponseEntity.status(403).build();

        return ResponseEntity.ok(
            log.getGroup().getStudents().stream()
                .map(s -> {
                    byte sum = s.getScoresByLog(log);
                    return new StudentsResponse(
                        s.getName(),
                        s.getEmail(),
                        sum,
                        s.getGradeByLog(log, sum)
                    );
                })
                .sorted(new Comparator<StudentsResponse>() {
                    @Override
                    public int compare(StudentsResponse s1, StudentsResponse s2) {
                        return s1.getName().compareTo(s2.getName());
                    }
                })
        );
    }
}
