package org.example.entities.repos;

import org.example.entities.Log;
import org.springframework.data.repository.CrudRepository;

public interface LogRepo extends CrudRepository<Log, Integer> {
}
