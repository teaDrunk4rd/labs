package org.example.db.repos;

import org.example.db.entities.Discipline;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface DisciplineRepo extends CrudRepository<Discipline, Integer> {
    Discipline findByName(String name);
    @Override
    List<Discipline> findAll();

    void saveAndFlush(Discipline discipline);
}
