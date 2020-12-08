package org.example.db.repos;

import org.example.db.entities.Lab;
import org.example.db.entities.Log;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface LabRepo extends CrudRepository<Lab, Integer> {
    List<Lab> findByLog(Log log);
    List<Lab> findByName(String name);
}
