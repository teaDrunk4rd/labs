package org.example.db.entities;

import javax.persistence.*;
import java.util.Set;

@Entity
@Table(name="disciplineTypes")
public class DisciplineType {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;

    @Column(nullable = false)
    private String name;

    @Column(unique = true, nullable = false)
    private String key;

    @OneToMany(mappedBy="disciplineType")
    Set<Log> logs;

    public DisciplineType() {
    }

    public DisciplineType(String name, String key) {
        this.name = name;
        this.key = key;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getKey() {
        return key;
    }

    public void setKey(String key) {
        this.key = key;
    }
}
