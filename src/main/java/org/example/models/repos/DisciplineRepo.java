package org.example.models.repos;

import org.example.models.Discipline;
import org.springframework.data.repository.CrudRepository;

public interface DisciplineRepo extends CrudRepository<Discipline, Integer> {
}
