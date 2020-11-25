package org.example.db.seeders;

import org.example.db.Seeder;
import org.example.db.entities.Role;
import org.example.db.repos.RoleRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.Arrays;

@Component
public class RolesSeeder implements Seeder {
    @Autowired
    private RoleRepo repo;

    @Override
    public void run() {
        if (repo.count() == 0) {
            repo.saveAll(Arrays.asList(
                new Role("Админ", "admin"),
                new Role("Студент", "student"),
                new Role("Преподаватель", "teacher")
            ));
        }
    }
}
