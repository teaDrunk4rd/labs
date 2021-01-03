package org.example.controllers;

import org.example.db.ERole;
import org.example.db.entities.Group;
import org.example.db.entities.User;
import org.example.db.repos.GroupRepo;
import org.example.db.repos.LogRepo;
import org.example.db.repos.RoleRepo;
import org.example.db.repos.UserRepo;
import org.example.payload.request.UpdateUserRequest;
import org.example.payload.request.UserRequest;
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
    private GroupRepo groupRepo;
    @Autowired
    private UserDetailsGetter userDetailsGetter;
    @Autowired
    private JwtUtils jwtUtils;
    @Autowired
    private PasswordEncoder encoder;

    @GetMapping("profile")
    public ResponseEntity<ProfileResponse> profile() {
        User user = userRepo.findById(userDetailsGetter.getUserDetails().getId()).orElse(null);
        return ResponseEntity.ok(
            new ProfileResponse(
                user.getEmail(),
                user.getName(),
                user.getGroup() != null ? user.getGroup().getName() : null,
                user.getGroup() != null ? user.getGroup().getCourse() : null
            )
        );
    }

    @PutMapping("profile/update")
    public ResponseEntity<?> profileUpdate(@Valid @RequestBody UpdateUserRequest updateUserRequest) {
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

    @Secured("ROLE_ADMIN")
    @GetMapping("/teachers")
    public ResponseEntity<?> teachers() {
        return ResponseEntity.ok(userRepo.findByRole(roleRepo.findByKey("teacher")));
    }

    @Secured("ROLE_ADMIN")
    @GetMapping("/users")
    public ResponseEntity<?> index() {
        return ResponseEntity.ok(
            userRepo.findAll()
                .stream().sorted(Comparator.comparing(u -> u.getRole().getName()))
        );
    }

    @Secured("ROLE_ADMIN")
    @GetMapping("/users/user")
    public ResponseEntity<?> show(@RequestParam int id) {
        User user = userRepo.findById(id).orElse(null);
        return user != null ? ResponseEntity.ok(user) : ResponseEntity.badRequest().build();
    }

    @Secured("ROLE_ADMIN")
    @PostMapping("/users/user/create")
    public ResponseEntity<?> store(@Valid @RequestBody UserRequest request) {
        String validationMessage = request.validate(userRepo, roleRepo, null);
        if (validationMessage != null) return ResponseEntity.badRequest().body(new MessageResponse(validationMessage));

        userRepo.saveAndFlush(new User(
            request.getName(),
            request.getEmail(),
            encoder.encode(request.getPassword()),
            groupRepo.findById(request.getGroupId()).orElse(null),
            roleRepo.findById(request.getRoleId()).get()
        ));

        return ResponseEntity.ok().build();
    }

    @Secured("ROLE_ADMIN")
    @PutMapping("/users/user/update")
    public ResponseEntity<?> update(@Valid @RequestBody UserRequest request) {
        User user = userRepo.findById(request.getId()).orElse(null);
        if (user == null) return ResponseEntity.badRequest().build();

        String validationMessage = request.validate(userRepo, roleRepo, user);
        if (validationMessage != null) return ResponseEntity.badRequest().body(new MessageResponse(validationMessage));

        user.setName(request.getName());
        user.setEmail(request.getEmail());
        user.setRole(roleRepo.findById(request.getRoleId()).get());
        if (user.getRole().getERole() == ERole.ROLE_STUDENT)
            user.setGroup(groupRepo.findById(request.getGroupId()).get());

        userRepo.saveAndFlush(user);

        return ResponseEntity.ok().build();
    }

    @Secured("ROLE_ADMIN")
    @DeleteMapping("/users/user/delete")
    public ResponseEntity<?> delete(@RequestParam int id) {
        if (id == userDetailsGetter.getUserDetails().getId())
            return ResponseEntity.badRequest().body(
                new MessageResponse("Вы не можете удалить себя. Удалить вас может только Господь или Путин.")
            );
        userRepo.deleteById(id);
        return ResponseEntity.ok().build();
    }
}
