package org.example.controllers;

import org.example.db.entities.Lab;
import org.example.db.entities.Log;
import org.example.db.entities.User;
import org.example.db.repos.LogRepo;
import org.example.db.repos.UserRepo;
import org.example.payload.response.DisciplineResponse;
import org.example.payload.response.DisciplinesResponse;
import org.example.payload.response.DisciplinesLabs;
import org.example.security.UserDetailsGetter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.*;

import java.util.Comparator;
import java.util.Map;
import java.util.stream.Collectors;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/")
public class DisciplineController {
    @Autowired
    private UserRepo userRepo;
    @Autowired
    private LogRepo logRepo;
    @Autowired
    private UserDetailsGetter userDetailsGetter;

    @Secured("ROLE_STUDENT")
    @GetMapping("disciplines")
    public ResponseEntity<?> index() {
        User student = userRepo.findById(userDetailsGetter.getUserDetails().getId()).get();

        return ResponseEntity.ok(
            student.getGroup().getLogs().stream()
                .sorted((l1, l2) -> student.getScoresByLog(l2).compareTo(student.getScoresByLog(l1)))
                .map(l -> new DisciplinesResponse(
                    l.getId(),
                    l.getDiscipline().getName(),
                    l.getDisciplineType().getName(),
                    student.getScoresByLog(l),
                    student.getGradeByLog(l)
                ))
        );
    }

    @Secured("ROLE_STUDENT")
    @GetMapping("disciplines/discipline")
    public ResponseEntity<DisciplineResponse> show(@RequestParam int logId) {
        User student = userRepo.findById(userDetailsGetter.getUserDetails().getId()).get();
        Log log = logRepo.findById(logId).orElse(null);

        if (log == null) return ResponseEntity.badRequest().build();
        if (log.getGroup() != student.getGroup()) return ResponseEntity.status(403).build();

        return ResponseEntity.ok(new DisciplineResponse(
            log.getDiscipline().getName(),
            log.getDisciplineType().getName(),
            log.getDescription(),
            log.getTeacher().getName()
        ));
    }

    @Secured("ROLE_STUDENT")
    @GetMapping("disciplines/discipline/labs")
    public ResponseEntity<?> getDisciplineLabs(@RequestParam int logId) {
        User student = userRepo.findById(userDetailsGetter.getUserDetails().getId()).get();
        Log log = logRepo.findById(logId).orElse(null);

        if (log == null) return ResponseEntity.badRequest().build();
        if (log.getGroup() != student.getGroup()) return ResponseEntity.status(403).build();

        return ResponseEntity.ok(
            log.getLabs()
                .stream()
                .sorted(Comparator.comparing(Lab::getIssueDate).thenComparing(Lab::getName))
                .peek(l -> l.setStudentLabs(
                    l.getStudentLabs().stream()
                            .filter(sl -> sl.getStudent() == student)
                            .collect(Collectors.toSet())
                ))
                .map(l -> new DisciplinesLabs(
                    l.getName(),
                    l.getIssueDate(),
                    l.getExpectedCompletionDate(),
                    l.getScores(),
                    l.getStudentLabs().size() != 0 ? l.getStudentLabs().iterator().next().getCompletionDate() : null,
                    l.getStudentLabs().size() != 0 ? l.getStudentLabs().iterator().next().getScores() : null
                ))
        );
    }
}
