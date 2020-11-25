package org.example.controllers;

import org.example.BaseResponse;
import org.example.entities.Discipline;
import org.example.entities.repos.DisciplineRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/")
public class DisciplineController {
    @Autowired
    private DisciplineRepo disciplineRepo;

    @GetMapping("disciplines")
    public BaseResponse<Discipline> index() {
        return new BaseResponse<>(
            disciplineRepo.findAll(), 200
        );
    }
}
