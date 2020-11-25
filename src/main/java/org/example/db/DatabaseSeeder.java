package org.example.db;

import org.example.db.entities.Direction;
import org.example.db.entities.Discipline;
import org.example.db.repos.*;
import org.example.db.seeders.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.event.ContextRefreshedEvent;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Component;

@Component
public class DatabaseSeeder {
    @Autowired
    private DisciplinesSeeder disciplinesSeeder;
    @Autowired
    private DisciplineTypesSeeder disciplineTypesSeeder;
    @Autowired
    private RolesSeeder rolesSeeder;
    @Autowired
    private DirectionsSeeder directionsSeeder;
    @Autowired
    private GroupsSeeder groupsSeeder;
    @Autowired
    private UsersSeeder usersSeeder;
    @Autowired
    private LogsSeeder logsSeeder;
    @Autowired
    private LabsSeeder labsSeeder;
    @Autowired
    private StudentLabsSeeder studentLabsSeeder;

    @EventListener
    public void handleContextRefresh(ContextRefreshedEvent event) {
        disciplinesSeeder.run();
        disciplineTypesSeeder.run();
        rolesSeeder.run();
        directionsSeeder.run();

        groupsSeeder.run();
        usersSeeder.run();
        logsSeeder.run();
        labsSeeder.run();
        studentLabsSeeder.run();
    }
}