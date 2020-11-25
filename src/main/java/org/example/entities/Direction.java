package org.example.entities;

import javax.persistence.*;
import java.util.Set;

@Entity
@Table(name="directions")
public class Direction {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;

    private String name;

    @OneToMany(mappedBy="direction")
    Set<Group> groups;

    public Direction() {
    }

    public Direction(String name) {
        setName(name);
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
