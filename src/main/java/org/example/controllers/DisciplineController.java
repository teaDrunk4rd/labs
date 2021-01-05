package org.example.controllers;

import org.example.db.entities.*;
import org.example.db.repos.DisciplineRepo;
import org.example.db.repos.LogRepo;
import org.example.db.repos.UserRepo;
import org.example.payload.request.NameRequest;
import org.example.security.UserDetailsGetter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.Comparator;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/")
public class DisciplineController {
    @Autowired
    private UserRepo userRepo;
    @Autowired
    private LogRepo logRepo;
    @Autowired
    private DisciplineRepo disciplineRepo;
    @Autowired
    private UserDetailsGetter userDetailsGetter;

    @Secured("ROLE_ADMIN")
    @GetMapping("disciplines")
    public ResponseEntity<?> index() {
        return ResponseEntity.ok(disciplineRepo.findAll().stream().sorted(Comparator.comparing(Discipline::getName)));
    }

    @Secured("ROLE_ADMIN")
    @GetMapping("disciplines/discipline")
    public ResponseEntity<?> show(@RequestParam int id) {
        Discipline discipline = disciplineRepo.findById(id).orElse(null);
        return discipline != null ? ResponseEntity.ok(discipline) : ResponseEntity.badRequest().build();
    }

    @Secured("ROLE_ADMIN")
    @GetMapping("disciplines/discipline/logs")
    public ResponseEntity<?> disciplineLogs(@RequestParam int id) {
        Discipline discipline = disciplineRepo.findById(id).orElse(null);
        return discipline != null ? ResponseEntity.ok(discipline.getLogs()) : ResponseEntity.badRequest().build();
    }

    @Secured("ROLE_ADMIN")
    @PostMapping("/disciplines/discipline/create")
    public ResponseEntity<?> store(@Valid @RequestBody NameRequest request) {
        Discipline discipline = disciplineRepo.save(new Discipline(request.getName()));
        return ResponseEntity.ok(discipline.getId());
    }

    @Secured("ROLE_ADMIN")
    @PutMapping("/disciplines/discipline/update")
    public ResponseEntity<?> update(@Valid @RequestBody NameRequest request) {
        Discipline discipline = disciplineRepo.findById(request.getId()).orElse(null);
        if (discipline == null) return ResponseEntity.badRequest().build();

        discipline.setName(request.getName());
        disciplineRepo.saveAndFlush(discipline);

        return ResponseEntity.ok().build();
    }

    @Secured("ROLE_ADMIN")
    @DeleteMapping("/disciplines/discipline/delete")
    public ResponseEntity<?> delete(@RequestParam int id) {
        disciplineRepo.deleteById(id);
        return ResponseEntity.ok().build();
    }
}
