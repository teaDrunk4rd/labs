package org.example.db.repos;

import org.example.db.entities.Group;
import org.springframework.data.repository.CrudRepository;

public interface GroupRepo extends CrudRepository<Group, Integer> {
    Group findByName(String key);
}
