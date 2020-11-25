package org.example.db.seeders;

import org.example.db.Seeder;
import org.example.db.entities.Discipline;
import org.example.db.repos.DisciplineRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.Arrays;

@Component
public class DisciplinesSeeder implements Seeder {
    @Autowired
    private DisciplineRepo repo;

    @Override
    public void run() {
        if (repo.count() == 0) {
            repo.saveAll(Arrays.asList(
                new Discipline("Технологии человеко-машинного взаимодействия"),
                new Discipline("Средства реализации IT"),
                new Discipline("Управление проектами"),
                new Discipline("Мобильная разработка"),
                new Discipline("ИИ"),
                new Discipline("СиАКОД"),

                new Discipline("Русский язык"),
                new Discipline("Журналистика"),
                new Discipline("Психология")
            ));
        }
    }
}
