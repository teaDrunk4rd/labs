package org.example.controllers;

import org.example.db.repos.DisciplineTypeRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/")
public class DisciplineTypeController {
    @Autowired
    private DisciplineTypeRepo disciplineTypeRepo;

    @Secured("ROLE_ADMIN")
    @GetMapping("/disciplineTypes")
    public ResponseEntity<?> index() {
        return ResponseEntity.ok(disciplineTypeRepo.findAll());
    }
}
