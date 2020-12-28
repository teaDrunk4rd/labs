package org.example.controllers;

import org.example.db.ERole;
import org.example.db.entities.Lab;
import org.example.db.entities.Log;
import org.example.db.entities.StudentLab;
import org.example.db.entities.User;
import org.example.db.repos.LabRepo;
import org.example.db.repos.LogRepo;
import org.example.db.repos.StudentLabRepo;
import org.example.db.repos.UserRepo;
import org.example.payload.request.CreateLabRequest;
import org.example.payload.request.UpdateLabRequest;
import org.example.payload.response.LabResponse;
import org.example.payload.response.MessageResponse;
import org.example.payload.LabStudents;
import org.example.security.UserDetailsGetter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/")
public class LabController {
    @Autowired
    private UserRepo userRepo;
    @Autowired
    private LogRepo logRepo;
    @Autowired
    private LabRepo labRepo;
    @Autowired
    private StudentLabRepo studentLabRepo;
    @Autowired
    private UserDetailsGetter userDetailsGetter;

    @Secured({"ROLE_TEACHER", "ROLE_ADMIN"})
    @GetMapping("labs")
    public ResponseEntity<?> index(@RequestParam int logId) {
        User user = userRepo.findById(userDetailsGetter.getUserDetails().getId()).get();
        Log log = logRepo.findById(logId).orElse(null);

        if (log == null) return ResponseEntity.badRequest().build();
        if (log.getTeacher() != user && user.getRole().getERole() != ERole.ROLE_ADMIN) return ResponseEntity.status(403).build();

        return ResponseEntity.ok(
            log.getLabs().stream()
                .sorted(Comparator.comparing(Lab::getIssueDate))
        );
    }

    @Secured("ROLE_TEACHER")
    @GetMapping("labs/lab")
    public ResponseEntity<?> show(@RequestParam int id) {
        User teacher = userRepo.findById(userDetailsGetter.getUserDetails().getId()).get();
        Lab lab = labRepo.findById(id).orElse(null);

        if (lab == null) return ResponseEntity.badRequest().build();
        if (lab.getLog().getTeacher() != teacher) return ResponseEntity.status(403).build();

        return ResponseEntity.ok(
            new LabResponse(
                lab.getId(),
                lab.getName(),
                lab.getIssueDate(),
                lab.getExpectedCompletionDate(),
                lab.getScores(),
                lab.getLog().getGroup().getStudents().stream()
                    .sorted(Comparator.comparing(User::getName))
                    .map(
                        s -> {
                            List<StudentLab> sl = s.getStudentLabs().stream()
                                .filter(sll -> sll.getLab() == lab)
                                .collect(Collectors.toList());
                            return new LabStudents(
                                s.getName(),
                                s.getEmail(),
                                sl.size() != 0 ? sl.get(0).getCompletionDate() : null,
                                sl.size() != 0 ? sl.get(0).getScores() : 0
                            );
                        }
                    ).collect(Collectors.toList())
            )
        );
    }

    @Secured("ROLE_TEACHER")
    @GetMapping("labs/lab/students")
    public ResponseEntity<?> getStudentsByLog(@RequestParam int logId) {
        User teacher = userRepo.findById(userDetailsGetter.getUserDetails().getId()).get();
        Log log = logRepo.findById(logId).orElse(null);

        if (log == null) return ResponseEntity.badRequest().build();
        if (log.getTeacher() != teacher) return ResponseEntity.status(403).build();

        return ResponseEntity.ok(
            log.getGroup().getStudents().stream()
                .sorted(Comparator.comparing(User::getName))
                .map(s -> new LabStudents(s.getName(), s.getEmail(), null, (byte) 0))
                .collect(Collectors.toList())
        );
    }

    @Secured("ROLE_TEACHER")
    @PutMapping("labs/lab/create")
    public ResponseEntity<?> store(@Valid @RequestBody CreateLabRequest request) {
        User teacher = userRepo.findById(userDetailsGetter.getUserDetails().getId()).get();
        String validationMessage = request.validate();
        Log log = logRepo.findById(request.getLogId()).orElse(null);

        if (log == null) return ResponseEntity.badRequest().build();
        if (log.getTeacher() != teacher && teacher.getRole().getERole() != ERole.ROLE_ADMIN) return ResponseEntity.status(403).build();
        if (validationMessage != null) return ResponseEntity.badRequest().body(new MessageResponse(validationMessage));

        Lab lab = new Lab(
            request.getIssueDate(), request.getExpectedCompletionDate(), request.getName(), request.getScores(), log
        );
        labRepo.saveAndFlush(lab);

        studentLabRepo.saveAll(
            request.getStudents().stream()
                .filter(s -> s.getCompletionScore() != 0)
                .map(l -> new StudentLab(userRepo.findByEmail(l.getEmail()), lab, l.getCompletionDate(), l.getCompletionScore()))
                .collect(Collectors.toSet())
        );

        return ResponseEntity.ok(200);
    }

    @Secured("ROLE_TEACHER")
    @PutMapping("labs/lab/update")
    public ResponseEntity<?> update(@Valid @RequestBody UpdateLabRequest request) {
        User teacher = userRepo.findById(userDetailsGetter.getUserDetails().getId()).get();
        Lab lab = labRepo.findById(request.getId()).orElse(null);
        String validationMessage = request.validate();

        if (lab == null) return ResponseEntity.badRequest().build();
        if (lab.getLog().getTeacher() != teacher) return ResponseEntity.status(403).build();
        if (validationMessage != null) return ResponseEntity.badRequest().body(new MessageResponse(validationMessage));

        lab.setName(request.getName());
        lab.setIssueDate(request.getIssueDate());
        lab.setExpectedCompletionDate(request.getExpectedCompletionDate());
        lab.setScores(request.getScores());
        lab.setStudentLabs(null);
        labRepo.saveAndFlush(lab);

        studentLabRepo.saveAll(
            request.getStudents().stream()
                .filter(s -> s.getCompletionScore() != 0)
                .map(l -> new StudentLab(userRepo.findByEmail(l.getEmail()), lab, l.getCompletionDate(), l.getCompletionScore()))
                .collect(Collectors.toSet())
        );

        return ResponseEntity.ok(200);
    }

    @Secured("ROLE_TEACHER")
    @DeleteMapping("labs/delete")
    public ResponseEntity<?> delete(@RequestParam int id) {
        User teacher = userRepo.findById(userDetailsGetter.getUserDetails().getId()).get();
        Lab lab = labRepo.findById(id).orElse(null);

        if (lab == null) return ResponseEntity.badRequest().build();
        if (lab.getLog().getTeacher() != teacher) return ResponseEntity.status(403).build();

        labRepo.deleteById(id);

        return ResponseEntity.ok(200);
    }
}
