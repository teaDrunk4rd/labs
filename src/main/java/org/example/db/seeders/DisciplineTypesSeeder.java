package org.example.db.seeders;

import org.example.db.Seeder;
import org.example.db.entities.DisciplineType;
import org.example.db.repos.DisciplineTypeRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.Arrays;

@Component
public class DisciplineTypesSeeder implements Seeder {
    @Autowired
    private DisciplineTypeRepo repo;

    @Override
    public void run() {
        if (repo.count() == 0) {
            repo.saveAll(Arrays.asList(
                new DisciplineType("Зачёт", "credit"),
                new DisciplineType("Экзамен", "exam")
            ));
        }
    }
}
