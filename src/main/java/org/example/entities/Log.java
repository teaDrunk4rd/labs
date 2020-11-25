package org.example.entities;

import javax.persistence.*;
import java.util.Set;

@Entity
@Table(name="logs")
public class Log {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;

    private String description;

    @ManyToOne
    @JoinColumn(name ="DisciplineId")
    private Discipline discipline;

    @ManyToOne
    @JoinColumn(name ="DisciplineTypeId")
    private DisciplineType disciplineType;

    @ManyToOne
    @JoinColumn(name ="GroupId")
    private Group group;

    @ManyToOne
    @JoinColumn(name ="TeacherId")
    private User teacher;

    @OneToMany(mappedBy="log")
    Set<Lab> labs;

    public Log() {
    }

    public Log(String description, Discipline discipline, DisciplineType disciplineType, Group group, User teacher) {
        this.description = description;
        this.discipline = discipline;
        this.disciplineType = disciplineType;
        this.group = group;
        this.teacher = teacher;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Discipline getDiscipline() {
        return discipline;
    }

    public void setDiscipline(Discipline discipline) {
        this.discipline = discipline;
    }

    public DisciplineType getDisciplineType() {
        return disciplineType;
    }

    public void setDisciplineType(DisciplineType disciplineType) {
        this.disciplineType = disciplineType;
    }

    public Group getGroup() {
        return group;
    }

    public void setGroup(Group group) {
        this.group = group;
    }

    public User getTeacher() {
        return teacher;
    }

    public void setTeacher(User teacher) {
        this.teacher = teacher;
    }
}
