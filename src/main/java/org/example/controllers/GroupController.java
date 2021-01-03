package org.example.controllers;

import org.example.db.entities.Group;
import org.example.db.entities.Log;
import org.example.db.entities.User;
import org.example.db.repos.DirectionRepo;
import org.example.db.repos.GroupRepo;
import org.example.db.repos.LogRepo;
import org.example.db.repos.UserRepo;
import org.example.payload.request.GroupRequest;
import org.example.payload.response.StudentsResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.Comparator;
import java.util.stream.Collectors;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/")
public class GroupController {
    @Autowired
    private GroupRepo groupRepo;
    @Autowired
    private LogRepo logRepo;
    @Autowired
    private UserRepo userRepo;
    @Autowired
    private DirectionRepo directionRepo;

    @Secured("ROLE_ADMIN")
    @GetMapping("/groups")
    public ResponseEntity<?> index() {
        return ResponseEntity.ok(
            groupRepo.findAll().stream()
                .sorted(Comparator.comparing(l -> l.getDirection().getName()))
        );
    }

    @Secured("ROLE_ADMIN")
    @GetMapping("/groups/group")
    public ResponseEntity<?> show(@RequestParam int id) {
        Group group = groupRepo.findById(id).orElse(null);
        return group != null ? ResponseEntity.ok(group) : ResponseEntity.badRequest().build();
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

    @Secured("ROLE_ADMIN")
    @PostMapping("/groups/group/create")
    public ResponseEntity<?> store(@Valid @RequestBody GroupRequest request) {
        groupRepo.saveAndFlush(new Group(
            request.getName(),
            request.getCourse(),
            directionRepo.findById(request.getDirectionId()).get()
        ));

        return ResponseEntity.ok().build();
    }

    @Secured("ROLE_ADMIN")
    @PostMapping("/groups/group/update")
    public ResponseEntity<?> update(@Valid @RequestBody GroupRequest request) {
        Group group = groupRepo.findById(request.getId()).orElse(null);
        if (group == null) return ResponseEntity.badRequest().build();

        group.setName(request.getName());
        group.setCourse(request.getCourse());
        group.setDirection(directionRepo.findById(request.getDirectionId()).get());
        groupRepo.saveAndFlush(group);

        return ResponseEntity.ok().build();
    }

    @Secured("ROLE_ADMIN")
    @DeleteMapping("/groups/group/delete")
    public ResponseEntity<?> delete(@RequestParam int id) {
        groupRepo.deleteById(id);
        return ResponseEntity.ok().build();
    }
}
