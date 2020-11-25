package org.example.entities;

import javax.persistence.*;
import java.util.Set;

@Entity
@Table(name="groups")
public class Group {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;

    private String name;

    private Byte courseNum;

    @ManyToOne
    @JoinColumn(name ="DirectionId")
    private Direction direction;

    @OneToMany(mappedBy="group")
    Set<Log> logs;

    @OneToMany(mappedBy="group")
    Set<User> students;

    public Group() {
    }

    public Group(String name, Byte courseNum) {
        setName(name);
        setCourseNum(courseNum);
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
}
