package org.example.entities;

import javax.persistence.*;
import java.util.Set;

@Entity
@Table(name="disciplineTypes")
public class DisciplineType {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;

    private String name;

    @OneToMany(mappedBy="disciplineType")
    Set<Log> logs;

    public DisciplineType() {
    }

    public DisciplineType(String name) {
        setName(name);
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
