package org.example.db.seeders;

import org.example.db.Seeder;
import org.example.db.entities.Direction;
import org.example.db.repos.DirectionRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.Arrays;

@Component
public class DirectionsSeeder implements Seeder {
    @Autowired
    private DirectionRepo repo;

    @Override
    public void run() {
        if (repo.count() == 0) {
            repo.saveAll(Arrays.asList(
                new Direction("ИСиТ"),
                new Direction("ПИ"),
                new Direction("МОАиС"),

                new Direction("Журналистика"),
                new Direction("Психологическое направление"),
                new Direction("Гуманитарии в общем")
            ));
        }
    }
}
