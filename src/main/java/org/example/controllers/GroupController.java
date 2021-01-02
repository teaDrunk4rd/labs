package org.example.controllers;

import org.example.db.entities.Group;
import org.example.db.entities.Log;
import org.example.db.entities.User;
import org.example.db.repos.GroupRepo;
import org.example.db.repos.LogRepo;
import org.example.payload.response.StudentsResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.*;

import java.util.Comparator;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/")
public class GroupController {
    @Autowired
    private GroupRepo groupRepo;
    @Autowired
    private LogRepo logRepo;

    @Secured("ROLE_ADMIN")
    @GetMapping("/groups")
    public ResponseEntity<?> index() {
        return ResponseEntity.ok(
            groupRepo.findAll().stream()
                .sorted(Comparator.comparing(l -> l.getDirection().getName()))
        );
    }

    @Secured("ROLE_ADMIN")
    @GetMapping("/groups/group/students")
    public ResponseEntity<?> groupStudents(@RequestParam int groupId, @RequestParam Integer logId) {
        Group group = groupRepo.findById(groupId).orElse(null);
        Log log = logRepo.findById(logId).orElse(null);

        if (group == null) return ResponseEntity.badRequest().build();

        if (log != null && group.getLogs().stream().anyMatch(l -> l == log))
            return ResponseEntity.ok(
                group.getStudents().stream()
                    .map(s -> {
                        byte sum = s.getScoresByLog(log);
                        return new StudentsResponse(
                            s.getId(),
                            s.getName(),
                            s.getEmail(),
                            sum,
                            s.getGradeByLog(log, sum)
                        );
                    })
                    .sorted(Comparator.comparing(StudentsResponse::getName))
            );

        return ResponseEntity.ok(
            group.getStudents().stream()
                .sorted(Comparator.comparing(User::getName))
        );
    }
}
