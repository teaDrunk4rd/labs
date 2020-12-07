package org.example.db.seeders;

import org.example.db.Seeder;
import org.example.db.entities.User;
import org.example.db.repos.GroupRepo;
import org.example.db.repos.RoleRepo;
import org.example.db.repos.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.Arrays;

@Component
public class UsersSeeder implements Seeder {
    @Autowired
    private UserRepo userRepo;
    @Autowired
    private GroupRepo groupRepo;
    @Autowired
    private RoleRepo roleRepo;
    @Autowired
    PasswordEncoder encoder;

    @Override
    public void run() {
        if (userRepo.count() == 0) {
            userRepo.saveAll(Arrays.asList(
                new User("Админ", "admin@m.ru", encoder.encode("123"),
                        null, roleRepo.findByKey("admin")),

                new User("Лучший Препод 1", "teacher1@m.ru", encoder.encode("123"),
                        null, roleRepo.findByKey("teacher")),
                new User("Лучший Препод 2", "teacher2@m.ru", encoder.encode("123"),
                        null, roleRepo.findByKey("teacher")),
                new User("Препод 3", "teacher3@m.ru", encoder.encode("123"),
                        null, roleRepo.findByKey("teacher")),

                new User("Студент 1", "student1@m.ru", encoder.encode("123"),
                        groupRepo.findByName("179ИСиТ"), roleRepo.findByKey("student")),
                new User("Студент 2", "student2@m.ru", encoder.encode("123"),
                        groupRepo.findByName("175ПИ"), roleRepo.findByKey("student")),
                new User("Студент 3", "student3@m.ru", encoder.encode("123"),
                        groupRepo.findByName("228ЖурФак"), roleRepo.findByKey("student"))
            ));
        }
    }
}
