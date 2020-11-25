package org.example.db.repos;

import org.example.db.entities.Discipline;
import org.springframework.data.repository.CrudRepository;

public interface DisciplineRepo extends CrudRepository<Discipline, Integer> {
    Discipline findByName(String name);
}
