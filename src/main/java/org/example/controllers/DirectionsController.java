package org.example.controllers;

import org.example.db.entities.Direction;
import org.example.db.repos.DirectionRepo;
import org.example.payload.request.NameRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/")
public class DirectionsController {
    @Autowired
    private DirectionRepo directionRepo;

    @Secured("ROLE_ADMIN")
    @GetMapping("/directions")
    public ResponseEntity<?> index() {
        return ResponseEntity.ok(directionRepo.findAll());
    }

    @Secured("ROLE_ADMIN")
    @GetMapping("/directions/direction")
    public ResponseEntity<?> show(@RequestParam int id) {
        Direction direction = directionRepo.findById(id).orElse(null);
        return direction != null ? ResponseEntity.ok(direction) : ResponseEntity.badRequest().build();
    }

    @Secured("ROLE_ADMIN")
    @GetMapping("directions/direction/groups")
    public ResponseEntity<?> directionGroups(@RequestParam int id) {
        Direction direction = directionRepo.findById(id).orElse(null);
        return direction != null ? ResponseEntity.ok(direction.getGroups()) : ResponseEntity.badRequest().build();
    }

    @Secured("ROLE_ADMIN")
    @PostMapping("/directions/direction/create")
    public ResponseEntity<?> store(@Valid @RequestBody NameRequest request) {
        Direction direction = directionRepo.save(new Direction(request.getName()));
        return ResponseEntity.ok(direction.getId());
    }

    @Secured("ROLE_ADMIN")
    @PutMapping("/directions/direction/update")
    public ResponseEntity<?> update(@Valid @RequestBody NameRequest request) {
        Direction direction = directionRepo.findById(request.getId()).orElse(null);
        if (direction == null) return ResponseEntity.badRequest().build();

        direction.setName(request.getName());
        directionRepo.saveAndFlush(direction);

        return ResponseEntity.ok().build();
    }

    @Secured("ROLE_ADMIN")
    @DeleteMapping("/directions/direction/delete")
    public ResponseEntity<?> delete(@RequestParam int id) {
        directionRepo.deleteById(id);
        return ResponseEntity.ok().build();
    }
}
