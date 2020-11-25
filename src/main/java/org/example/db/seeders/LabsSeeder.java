package org.example.db.seeders;

import org.example.db.Seeder;
import org.example.db.entities.Lab;
import org.example.db.entities.Log;
import org.example.db.repos.LabRepo;
import org.example.db.repos.LogRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@Component
public class LabsSeeder implements Seeder {
    @Autowired
    private LabRepo repo;
    @Autowired
    private LogRepo logRepo;

    @Override
    public void run() {
        if (repo.count() == 0) {
            List<Log> logs = new ArrayList<>();
            logRepo.findAll().iterator().forEachRemaining(logs::add);

            repo.saveAll(Arrays.asList(
                new Lab(null, "1. Front", (byte) 61, logs.get(0)),
                new Lab(null, "2. Back without db", (byte) 15, logs.get(0)),
                new Lab(null, "3. Back w/db", (byte) 15, logs.get(0)),

                new Lab(null, "Весь проект", (byte) 100, logs.get(1)),

                new Lab(null, "Опросите людей пж(", (byte) 100, logs.get(2))
            ));
        }
    }
}
