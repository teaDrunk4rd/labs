package org.example.db.repos;

import org.example.db.entities.Lab;
import org.springframework.data.repository.CrudRepository;

public interface LabRepo extends CrudRepository<Lab, Integer> {
}
