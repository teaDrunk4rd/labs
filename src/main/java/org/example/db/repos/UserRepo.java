package org.example.db.repos;

import org.example.db.entities.Role;
import org.example.db.entities.User;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface UserRepo extends CrudRepository<User, Integer> {
    User findByEmail(String email);

    List<User> findByRole(Role role);

    void saveAndFlush(User user);
}
