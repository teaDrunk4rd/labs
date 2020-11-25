package org.example.db.repos;

import org.example.db.entities.StudentLab;
import org.springframework.data.repository.CrudRepository;

public interface StudentLabRepo extends CrudRepository<StudentLab, Integer> {
}
