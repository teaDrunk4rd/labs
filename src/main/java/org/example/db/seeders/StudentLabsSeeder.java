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
            List<User> students = userRepo.findByRole(roleRepo.findByKey("student"));

            studentLabRepo.saveAll(Arrays.asList(
                new StudentLab(students.get(0), labRepo.findByName("1. Front").get(0), new Date(),
                        labRepo.findByName("1. Front").get(0).getScores()),
                new StudentLab(students.get(0), labRepo.findByName("2. Back without db").get(0), new Date(),
                        labRepo.findByName("2. Back without db").get(0).getScores()),

                new StudentLab(students.get(0), labRepo.findByName("Выбор предметной области").get(0), new Date(),
                        labRepo.findByName("Выбор предметной области").get(0).getScores()),
                    new StudentLab(students.get(0), labRepo.findByName("Проектирование БД").get(0), new Date(),
                            labRepo.findByName("Проектирование БД").get(0).getScores()),
                    new StudentLab(students.get(0), labRepo.findByName("Инициализация проекта и роутинг по страницам").get(0), new Date(),
                            labRepo.findByName("Инициализация проекта и роутинг по страницам").get(0).getScores()),
                    new StudentLab(students.get(0), labRepo.findByName("Вывод информации из БД").get(0), new Date(),
                            labRepo.findByName("Вывод информации из БД").get(0).getScores()),
                    new StudentLab(students.get(0), labRepo.findByName("Аутентификация").get(0), new Date(),
                            labRepo.findByName("Аутентификация").get(0).getScores()),

                new StudentLab(students.get(2), labRepo.findByName("Опросите людей пж(").get(0), new Date(),
                        (byte) (labRepo.findByName("Опросите людей пж(").get(0).getScores() - 30))
            ));
        }
    }
}
