package org.example.db.seeders;

import org.example.db.Seeder;
import org.example.db.entities.Lab;
import org.example.db.entities.Log;
import org.example.db.repos.LabRepo;
import org.example.db.repos.LogRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.text.ParseException;
import java.text.SimpleDateFormat;
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
    public void run() throws ParseException {
        if (repo.count() == 0) {
            SimpleDateFormat df = new SimpleDateFormat("dd/MM/yyyy");

            List<Log> logs = new ArrayList<>();
            logRepo.findAll().iterator().forEachRemaining(logs::add);

            repo.saveAll(Arrays.asList(
                new Lab(df.parse("25/09/2020"), null, "1. Front", (byte) 61, logs.get(0)),
                new Lab(df.parse("25/09/2020"), df.parse("25/12/2020"), "2. Back without db", (byte) 15, logs.get(0)),
                new Lab(df.parse("25/09/2020"), df.parse("25/12/2020"), "3. Back w/db", (byte) 15, logs.get(0)),

                new Lab(df.parse("03/09/2020"), df.parse("10/09/2020"), "Выбор предметной области", (byte) 10, logs.get(1)),
                new Lab(df.parse("10/09/2020"), df.parse("20/09/2020"), "Создание форм на фигме", (byte) 10, logs.get(1)),
                new Lab(df.parse("20/09/2020"), df.parse("01/10/2020"), "Проектирование БД", (byte) 10, logs.get(1)),
                new Lab(df.parse("01/10/2020"), df.parse("15/10/2020"), "Инициализация проекта и роутинг по страницам", (byte) 10, logs.get(1)),
                new Lab(df.parse("15/10/2020"), df.parse("30/10/2020"), "Вывод информации из БД", (byte) 10, logs.get(1)),
                new Lab(df.parse("30/10/2020"), df.parse("05/11/2020"), "Вывод информации из БД на 5 страниц", (byte) 10, logs.get(1)),
                new Lab(df.parse("05/11/2020"), df.parse("10/11/2020"), "Аутентификация", (byte) 15, logs.get(1)),
                new Lab(df.parse("10/11/2020"), df.parse("10/12/2020"), "Реализация всего остального", (byte) 25, logs.get(1)),

                new Lab(null, null, "Опросите людей пж(", (byte) 100, logs.get(2))
            ));
        }
    }
}
