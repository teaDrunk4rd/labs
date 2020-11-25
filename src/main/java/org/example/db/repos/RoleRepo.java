package org.example.db.repos;

import org.example.db.entities.Role;
import org.springframework.data.repository.CrudRepository;

public interface RoleRepo extends CrudRepository<Role, Integer> {
    Role findByKey(String key);
}
