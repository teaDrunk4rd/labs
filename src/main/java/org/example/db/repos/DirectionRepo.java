package org.example.db.repos;

import org.example.db.entities.Direction;
import org.springframework.data.repository.CrudRepository;

public interface DirectionRepo extends CrudRepository<Direction, Integer> {
    Direction findByName(String name);
}
