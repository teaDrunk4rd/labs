package org.example.db.entities;

import javax.persistence.*;
import java.util.Set;

@Entity
@Table(name="groups")
public class Group {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;

    @Column(unique = true, nullable = false)
    private String name;

    @Column(nullable = false)
    private Byte courseNum;

    @ManyToOne
    @JoinColumn(name ="DirectionId", nullable = false)
    private Direction direction;

    @OneToMany(mappedBy="group")
    Set<Log> logs;

    @OneToMany(mappedBy="group")
    Set<User> students;

    public Group() {
    }

    public Group(String name, Byte courseNum, Direction direction) {
        this.name = name;
        this.courseNum = courseNum;
        this.direction = direction;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Byte getCourseNum() {
        return courseNum;
    }

    public void setCourseNum(Byte courseNum) {
        this.courseNum = courseNum;
    }

    public Direction getDirection() {
        return direction;
    }

    public void setDirection(Direction direction) {
        this.direction = direction;
    }
}
