package org.example.db.repos;

import org.example.db.entities.Group;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface GroupRepo extends CrudRepository<Group, Integer> {
    Group findByName(String key);
    @Override
    List<Group> findAll();
}
