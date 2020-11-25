package org.example.db.repos;

import org.example.db.entities.Log;
import org.springframework.data.repository.CrudRepository;

public interface LogRepo extends CrudRepository<Log, Integer> {
}
