package org.example.controllers;

import org.example.db.ERole;
import org.example.db.entities.Log;
import org.example.db.entities.User;
import org.example.db.repos.UserRepo;
import org.example.payload.response.CalendarResponse;
import org.example.security.UserDetailsGetter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.YearMonth;
import java.time.ZoneId;
import java.util.Calendar;
import java.util.Date;
import java.util.Set;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/")
public class CalendarController {
    @Autowired
    private UserRepo userRepo;
    @Autowired
    private UserDetailsGetter userDetailsGetter;

    @Secured({"ROLE_TEACHER", "ROLE_STUDENT"})
    @GetMapping("calendar")
    public ResponseEntity<?> index(@RequestParam String dateTimestamp) {
        Date date = new Date(Long.parseLong(dateTimestamp.split("\\.")[0]) * 1000);
        Calendar c = Calendar.getInstance();
        c.setTime(date);
        c.set(Calendar.DAY_OF_MONTH, c.getActualMaximum(Calendar.DAY_OF_MONTH));
        LocalDate leftDate =
            YearMonth.of(c.get(Calendar.YEAR), c.get(Calendar.MONTH) + 1).atDay(1);
        LocalDate rightDate =
            YearMonth.of(c.get(Calendar.YEAR), c.get(Calendar.MONTH) + 1).atDay(c.getActualMaximum(Calendar.DAY_OF_MONTH));

        User user = userRepo.findById(userDetailsGetter.getUserDetails().getId()).get();
        if (user.getRole().getERole() == ERole.ROLE_STUDENT)
            return ResponseEntity.ok(
                user.getGroup().getLogs().stream()
                    .peek(l -> l.setLabs(l.getLabs().stream()
                            .filter(ll -> ll.getIssueDate() != null)
                            .filter(ll -> {
                                LocalDate labLocalDate = ll.getIssueDate().toInstant().atZone(ZoneId.systemDefault()).toLocalDate();
                                return labLocalDate.isAfter(leftDate) && labLocalDate.isBefore(rightDate);
                            }).collect(Collectors.toSet()))
                    ).map(Log::getLabs)
                    .flatMap(Set::stream)
                    .map(l -> new CalendarResponse(
                            l.getName(),
                            l.getLog().getDiscipline().getName(),
                            l.getIssueDate(),
                            l.getStudentLabs().stream().anyMatch(sl -> sl.getStudent() == user)
                    ))
            );

        return ResponseEntity.ok(
            user.getLogs().stream()
                .peek(l -> l.setLabs(l.getLabs().stream()
                        .filter(ll -> ll.getIssueDate() != null)
                        .filter(ll -> {
                            LocalDate labLocalDate = ll.getIssueDate().toInstant().atZone(ZoneId.systemDefault()).toLocalDate();
                            return labLocalDate.isAfter(leftDate) && labLocalDate.isBefore(rightDate);
                        }).collect(Collectors.toSet()))
                ).map(Log::getLabs)
                .flatMap(Set::stream)
                .map(l -> new CalendarResponse(
                        l.getName(),
                        l.getLog().getDiscipline().getName(),
                        l.getIssueDate(),
                        true
                ))
        );
    }
}
