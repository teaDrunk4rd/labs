package org.example.db.entities;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name="studentLabs")
public class StudentLab {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;

    @ManyToOne
    @JoinColumn(name ="StudentId", nullable = false)
    private User student;

    @ManyToOne(cascade = CascadeType.REMOVE)
    @JoinColumn(name ="LabId", nullable = false)
    private Lab lab;

    @Column(nullable = false)
    private Date completionDate;

    @Column(nullable = false, columnDefinition = "smallint default 0")
    private Byte scores = 0;

    public StudentLab() {
    }

    public StudentLab(User student, Lab lab, Date completionDate, Byte scores) {
        this.student = student;
        this.lab = lab;
        this.completionDate = completionDate;
        this.scores = scores;
    }

    public User getStudent() {
        return student;
    }

    public void setStudent(User student) {
        this.student = student;
    }

    public Lab getLab() {
        return lab;
    }

    public void setLab(Lab lab) {
        this.lab = lab;
    }

    public Date getCompletionDate() {
        return completionDate;
    }

    public void setCompletionDate(Date completionDate) {
        this.completionDate = completionDate;
    }

    public Byte getScores() {
        return scores;
    }

    public void setScores(Byte scores) {
        this.scores = scores;
    }
}
