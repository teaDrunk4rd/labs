package org.example.db.seeders;

import org.example.db.Seeder;
import org.example.db.entities.Lab;
import org.example.db.entities.StudentLab;
import org.example.db.entities.User;
import org.example.db.repos.LabRepo;
import org.example.db.repos.RoleRepo;
import org.example.db.repos.StudentLabRepo;
import org.example.db.repos.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Date;
import java.util.List;

@Component
public class StudentLabsSeeder implements Seeder {
    @Autowired
    private StudentLabRepo studentLabRepo;
    @Autowired
    private LabRepo labRepo;
    @Autowired
    private UserRepo userRepo;
    @Autowired
    private RoleRepo roleRepo;

    @Override
    public void run() {
        if (studentLabRepo.count() == 0) {
            List<Lab> labs = new ArrayList<>();
            labRepo.findAll().iterator().forEachRemaining(labs::add);

            List<User> students = userRepo.findByRole(roleRepo.findByKey("student"));

            studentLabRepo.saveAll(Arrays.asList(
                new StudentLab(students.get(0), labs.get(0), new Date(), labs.get(0).getScores()),
                new StudentLab(students.get(0), labs.get(1), new Date(), labs.get(1).getScores()),

                new StudentLab(students.get(0), labs.get(3), new Date(), labs.get(3).getScores()),

                new StudentLab(students.get(2), labs.get(4), new Date(), (byte) (labs.get(4).getScores() - 30))
            ));
        }
    }
}
