package org.example.controllers;

import org.example.db.entities.Log;
import org.example.db.entities.User;
import org.example.db.repos.LogRepo;
import org.example.db.repos.RoleRepo;
import org.example.db.repos.UserRepo;
import org.example.payload.response.LabsResponse;
import org.example.security.UserDetailsGetter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.*;

import java.util.Comparator;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/")
public class LabsController {
    @Autowired
    private UserRepo userRepo;
    @Autowired
    private LogRepo logRepo;
    @Autowired
    private RoleRepo roleRepo;
    @Autowired
    private UserDetailsGetter userDetailsGetter;

    @Secured({"ROLE_TEACHER", "ROLE_ADMIN"})
    @GetMapping("labs")
    public ResponseEntity<?> getLabs(@RequestParam int logId) {
        User user = userRepo.findById(userDetailsGetter.getUserDetails().getId()).get();
        Log log = logRepo.findById(logId).orElse(null);

        if (log == null) return ResponseEntity.badRequest().build();
        if (log.getTeacher() != user && user.getRole() != roleRepo.findByKey("admin")) return ResponseEntity.status(403).build();

        return ResponseEntity.ok(
            log.getLabs().stream()
                .map(l -> new LabsResponse(l.getName(), l.getIssueDate(), l.getScores()))
                .sorted(new Comparator<LabsResponse>() {
                    @Override
                    public int compare(LabsResponse s1, LabsResponse s2) {
                        return s1.getIssueDate().compareTo(s2.getIssueDate());
                    }
                })
        );
    }
}
