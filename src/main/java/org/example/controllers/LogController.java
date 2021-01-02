package org.example.controllers;

import org.example.db.ERole;
import org.example.db.entities.Log;
import org.example.db.entities.User;
import org.example.db.repos.*;
import org.example.payload.request.LogDescriptionUpdateRequest;
import org.example.payload.request.LogRequest;
import org.example.payload.response.LogResponse;
import org.example.payload.response.LogsResponse;
import org.example.security.UserDetailsGetter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/")
public class LogController {
    @Autowired
    private UserRepo userRepo;
    @Autowired
    private LogRepo logRepo;
    @Autowired
    private DisciplineRepo disciplineRepo;
    @Autowired
    private DisciplineTypeRepo disciplineTypeRepo;
    @Autowired
    private GroupRepo groupRepo;
    @Autowired
    private StudentLabRepo studentLabRepo;
    @Autowired
    private UserDetailsGetter userDetailsGetter;

    @Secured({"ROLE_ADMIN", "ROLE_TEACHER"})
    @GetMapping("logs")
    public ResponseEntity<?> index() {
        User user = userRepo.findById(userDetailsGetter.getUserDetails().getId()).get();
        List<Log> logs;

        if (user.getRole().getERole() == ERole.ROLE_TEACHER)
            logs = logRepo.findByTeacher(user);
        else
            logs = logRepo.findAll();

        return ResponseEntity.ok(
            logs.stream().map(l -> new LogsResponse(
                l.getId(),
                l.getDiscipline().getName(),
                l.getDisciplineType().getName(),
                l.getGroup().getName(),
                l.getGroup().getCourse(),
                l.getTeacher().getName()
            ))
        );
    }

    @Secured({"ROLE_ADMIN", "ROLE_TEACHER"})
    @GetMapping("logs/log")
    public ResponseEntity<?> show(@RequestParam int id) {
        User user = userRepo.findById(userDetailsGetter.getUserDetails().getId()).get();
        Log log = logRepo.findById(id).orElse(null);

        if (log == null) return ResponseEntity.badRequest().build();
        if (user.getRole().getERole() != ERole.ROLE_ADMIN && log.getTeacher() != user)
            return ResponseEntity.status(403).build();

        if (user.getRole().getERole() == ERole.ROLE_ADMIN)
            return ResponseEntity.ok(logRepo.findById(id));

        return ResponseEntity.ok(
            new LogResponse(
                log.getDiscipline().getName(),
                log.getDisciplineType().getName(),
                log.getDescription()
            )
        );
    }

    @Secured("ROLE_ADMIN")
    @PostMapping("logs/log/create")
    public ResponseEntity<?> store(@Valid @RequestBody LogRequest request) {
        logRepo.save(new Log(
            "",
            disciplineRepo.findById(request.getDisciplineId()).get(),
            disciplineTypeRepo.findById(request.getDisciplineTypeId()).get(),
            groupRepo.findById(request.getGroupId()).get(),
            userRepo.findById(request.getTeacherId()).get()
        ));

        return ResponseEntity.ok().build();
    }

    @Secured("ROLE_ADMIN")
    @PutMapping("logs/log/update")
    public ResponseEntity<?> update(@Valid @RequestBody LogRequest request) {
        Log log = logRepo.findById(request.getId()).orElse(null);
        if (log == null) return ResponseEntity.badRequest().build();

        if (!log.getGroup().getId().equals(request.getGroupId()))
            log.getLabs().forEach(l -> {
                l.getStudentLabs().forEach(lab -> studentLabRepo.delete(lab));
            });

        log.setDiscipline(disciplineRepo.findById(request.getDisciplineId()).get());
        log.setDisciplineType(disciplineTypeRepo.findById(request.getDisciplineTypeId()).get());
        log.setGroup(groupRepo.findById(request.getGroupId()).get());
        log.setTeacher(userRepo.findById(request.getTeacherId()).get());
        logRepo.saveAndFlush(log);

        return ResponseEntity.ok().build();
    }

    @Secured("ROLE_TEACHER")
    @PutMapping("logs/log/updateDescription")
    public ResponseEntity<?> updateDescription(@Valid @RequestBody LogDescriptionUpdateRequest request) {
        User teacher = userRepo.findById(userDetailsGetter.getUserDetails().getId()).get();
        Log log = logRepo.findById(request.getId()).orElse(null);

        if (log == null) return ResponseEntity.badRequest().build();
        if (log.getTeacher() != teacher) return ResponseEntity.status(403).build();

        log.setDescription(request.getDescription());
        logRepo.saveAndFlush(log);

        return ResponseEntity.ok().build();
    }

    @Secured("ROLE_ADMIN")
    @DeleteMapping("logs/log/delete")
    public ResponseEntity<?> delete(@RequestParam int id) {
        logRepo.deleteById(id);
        return ResponseEntity.ok().build();
    }
}
