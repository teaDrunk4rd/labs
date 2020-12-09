package org.example.controllers;

import org.example.db.entities.Log;
import org.example.db.entities.User;
import org.example.db.repos.LogRepo;
import org.example.db.repos.UserRepo;
import org.example.payload.request.LogUpdateRequest;
import org.example.payload.response.LogResponse;
import org.example.payload.response.LogsResponse;
import org.example.security.UserDetailsGetter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/")
public class LogController {
    @Autowired
    private UserRepo userRepo;
    @Autowired
    private LogRepo logRepo;
    @Autowired
    private UserDetailsGetter userDetailsGetter;

    @Secured("ROLE_TEACHER")
    @GetMapping("logs")
    public ResponseEntity<?> getTeacherLogs() {
        User teacher = userRepo.findById(userDetailsGetter.getUserDetails().getId()).get();

        return ResponseEntity.ok(
            logRepo.findByTeacher(teacher).stream()
                .map(l -> new LogsResponse(l.getId(), l.getDiscipline().getName(), l.getGroup().getName()))
        );
    }

    @Secured("ROLE_TEACHER")
    @GetMapping("logs/log")
    public ResponseEntity<?> getTeacherLog(@RequestParam int id) {
        User teacher = userRepo.findById(userDetailsGetter.getUserDetails().getId()).get();
        Log log = logRepo.findById(id).orElse(null);

        if (log == null) return ResponseEntity.badRequest().build();
        if (log.getTeacher() != teacher) return ResponseEntity.status(403).build();

        return ResponseEntity.ok(
            new LogResponse(log.getDiscipline().getName(), log.getDisciplineType().getName(), log.getDescription())
        );
    }

    @Secured("ROLE_TEACHER")
    @PutMapping("logs/log/update")
    public ResponseEntity<?> updateDescription(@Valid @RequestBody LogUpdateRequest request) {
        User teacher = userRepo.findById(userDetailsGetter.getUserDetails().getId()).get();
        Log log = logRepo.findById(request.getId()).orElse(null);

        if (log == null) return ResponseEntity.badRequest().build();
        if (log.getTeacher() != teacher) return ResponseEntity.status(403).build();

        log.setDescription(request.getDescription());
        logRepo.saveAndFlush(log);

        return ResponseEntity.ok(200);
    }
}
