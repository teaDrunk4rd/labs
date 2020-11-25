package org.example.db.seeders;

import org.example.db.Seeder;
import org.example.db.entities.Log;
import org.example.db.repos.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.Arrays;

@Component
public class LogsSeeder implements Seeder {
    @Autowired
    private LogRepo logRepo;
    @Autowired
    private DisciplineRepo disciplineRepo;
    @Autowired
    private DisciplineTypeRepo disciplineTypeRepo;
    @Autowired
    private GroupRepo groupRepo;
    @Autowired
    private UserRepo userRepo;

    @Override
    public void run() {
        if (logRepo.count() == 0) {
            logRepo.saveAll(Arrays.asList(
                new Log(
                    "На 5 - выполнить 1-3 пункты, на 4 выполнить без базы (в памяти хранить данные), на 3 - запилить только фронт",
                    disciplineRepo.findByName("Технологии человеко-машинного взаимодействия"),
                    disciplineTypeRepo.findByKey("exam"),
                    groupRepo.findByName("179ИСиТ"),
                    userRepo.findByEmail("teacher1@m.ru")
                ),
                new Log(
                        "Просто сделайте уже что-нибудь на джаве с тс",
                        disciplineRepo.findByName("Средства реализации IT"),
                        disciplineTypeRepo.findByKey("exam"),
                        groupRepo.findByName("179ИСиТ"),
                        userRepo.findByEmail("teacher2@m.ru")
                ),
                new Log(
                        "Блин, ну опросите там на улице кого-нибудь, пожалуйста -- получите зачёт",
                        disciplineRepo.findByName("Журналистика"),
                        disciplineTypeRepo.findByKey("credit"),
                        groupRepo.findByName("228ЖурФак"),
                        userRepo.findByEmail("teacher3@m.ru")
                )
            ));
        }
    }
}
