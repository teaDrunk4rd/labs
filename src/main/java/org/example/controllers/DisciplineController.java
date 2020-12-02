package org.example.controllers;

import org.example.db.entities.Discipline;
import org.example.db.repos.DisciplineRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/")
public class DisciplineController {
    @Autowired
    private DisciplineRepo disciplineRepo;

    @GetMapping("disciplines")
    public Iterable<Discipline> index() {
        return disciplineRepo.findAll();
    }
}
