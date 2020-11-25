package org.example.db.entities;

import javax.persistence.*;
import java.util.Set;

@Entity
@Table(name="disciplines")
public class Discipline {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;

    @Column(unique = true, nullable = false)
    private String name;

    @OneToMany(mappedBy="discipline")
    Set<Log> logs;

    public Discipline() {
    }

    public Discipline(String name) {
        setName(name);
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
