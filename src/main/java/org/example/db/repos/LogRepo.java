package org.example.db.repos;

import org.example.db.entities.Log;
import org.example.db.entities.User;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface LogRepo extends CrudRepository<Log, Integer> {
    List<Log> findByTeacher(User user);
    @Override
    List<Log> findAll();

    void saveAndFlush(Log log);
}
