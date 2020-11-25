package org.example.entities.repos;

import org.example.entities.Discipline;
import org.springframework.data.repository.CrudRepository;

public interface DisciplineRepo extends CrudRepository<Discipline, Integer> {
}
