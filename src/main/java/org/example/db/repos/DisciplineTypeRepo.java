package org.example.db.repos;

import org.example.db.entities.DisciplineType;
import org.springframework.data.repository.CrudRepository;

public interface DisciplineTypeRepo extends CrudRepository<DisciplineType, Integer> {
    DisciplineType findByKey(String key);
}
