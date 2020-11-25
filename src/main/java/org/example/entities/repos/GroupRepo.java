package org.example.entities.repos;

import org.example.entities.Group;
import org.springframework.data.repository.CrudRepository;

public interface GroupRepo extends CrudRepository<Group, Integer> {
}
