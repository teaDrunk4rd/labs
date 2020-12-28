package org.example.controllers;

import org.example.db.ERole;
import org.example.db.entities.Lab;
import org.example.db.entities.Log;
import org.example.db.entities.User;
import org.example.db.repos.LogRepo;
import org.example.db.repos.UserRepo;
import org.example.payload.response.LabsResponse;
import org.example.payload.response.ProfileResponse;
import org.example.payload.response.StudentLogResponse;
import org.example.payload.response.StudentsResponse;
import org.example.security.UserDetailsGetter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.*;

import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/")
public class StudentController {
    @Autowired
    private UserRepo userRepo;
    @Autowired
    private LogRepo logRepo;
    @Autowired
    private UserDetailsGetter userDetailsGetter;

    @Secured("ROLE_TEACHER")
    @GetMapping("students")
    public ResponseEntity<?> index(@RequestParam int logId) {
        User user = userRepo.findById(userDetailsGetter.getUserDetails().getId()).get();
        Log log = logRepo.findById(logId).orElse(null);

        if (log == null) return ResponseEntity.badRequest().build();
        if (log.getTeacher() != user) return ResponseEntity.status(403).build();

        return ResponseEntity.ok(
            log.getGroup().getStudents().stream()
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
    }

    @Secured("ROLE_TEACHER")
    @GetMapping("students/student")
    public ResponseEntity<?> show(@RequestParam int id) {
        User teacher = userRepo.findById(userDetailsGetter.getUserDetails().getId()).get();
        User student = userRepo.findById(id).orElse(null);

        if (student == null) return ResponseEntity.badRequest().build();
        if (student.getGroup().getLogs().stream().noneMatch(l -> l.getTeacher() == teacher))
            return ResponseEntity.status(403).build();

        return ResponseEntity.ok(
            new ProfileResponse(
                student.getEmail(),
                student.getName(),
                student.getGroup().getName(),
                student.getGroup().getCourse()
            )
        );
    }

    @Secured("ROLE_TEACHER")
    @GetMapping("students/student/logs")
    public ResponseEntity<?> studentLogs(@RequestParam int studentId) {
        User teacher = userRepo.findById(userDetailsGetter.getUserDetails().getId()).get();

        User student = userRepo.findById(studentId).orElse(null);
        if (student == null) return ResponseEntity.badRequest().build();

        List<Log> studentLogs = student.getGroup().getLogs().stream()
                .sorted(Comparator.comparing(l -> l.getDiscipline().getName()))
                .filter(l -> l.getTeacher() == teacher)
                .collect(Collectors.toList());
        if (studentLogs.size() == 0) return ResponseEntity.status(403).build();

        return ResponseEntity.ok(
            studentLogs.stream()
                .map(log -> new StudentLogResponse(
                    log.getId(),
                    log.getDiscipline().getName(),
                    student.getGradeByLog(log),
                    log.getLabs().stream()
                        .sorted(Comparator.comparing(Lab::getIssueDate).thenComparing(Lab::getName))
                        .peek(l -> l.setStudentLabs(
                            l.getStudentLabs().stream()
                                    .filter(sl -> sl.getStudent() == student)
                                    .collect(Collectors.toSet())
                        ))
                        .map(l -> new LabsResponse(
                            l.getId(),
                            l.getName(),
                            l.getIssueDate(),
                            l.getExpectedCompletionDate(),
                            l.getScores(),
                            l.getStudentLabs().size() != 0 ? l.getStudentLabs().iterator().next().getCompletionDate() : null,
                            l.getStudentLabs().size() != 0 ? l.getStudentLabs().iterator().next().getScores() : null
                        ))
                        .collect(Collectors.toList())
                ))
        );
    }
}
