package org.example.db.repos;

import org.example.db.entities.Direction;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface DirectionRepo extends CrudRepository<Direction, Integer> {
    Direction findByName(String name);
    @Override
    List<Direction> findAll();

    void saveAndFlush(Direction direction);
}
