package org.example.db.seeders;

import org.example.db.Seeder;
import org.example.db.entities.Group;
import org.example.db.repos.DirectionRepo;
import org.example.db.repos.GroupRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.Arrays;

@Component
public class GroupsSeeder implements Seeder {
    @Autowired
    private GroupRepo groupRepo;
    @Autowired
    private DirectionRepo directionRepo;

    @Override
    public void run() {
        if (groupRepo.count() == 0) {
            groupRepo.saveAll(Arrays.asList(
                new Group("179ИСиТ", (byte) 4, directionRepo.findByName("ИСиТ")),
                new Group("189ИСиТ", (byte) 3, directionRepo.findByName("ИСиТ")),
                new Group("175ПИ", (byte) 4, directionRepo.findByName("ПИ")),
                new Group("185ПИ", (byte) 3, directionRepo.findByName("ПИ")),

                new Group("228ЖурФак", (byte) 4, directionRepo.findByName("Журналистика"))
            ));
        }
    }
}
