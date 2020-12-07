package org.example.db.entities;

import javax.persistence.*;
import java.util.Date;
import java.util.Set;

@Entity
@Table(name="labs")
public class Lab {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;

    @Column(nullable = true)
    private Date issueDate;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false, columnDefinition = "smallint default 0")
    private Byte scores = 0;

    @ManyToOne
    @JoinColumn(name ="LogId", nullable = false)
    private Log log;

    @OneToMany(mappedBy="lab")
    private Set<StudentLab> studentLabs;

    public Lab() {
    }

    public Lab(Date issueDate, String name, Byte scores, Log log) {
        this.issueDate = issueDate;
        this.name = name;
        this.scores = scores;
        this.log = log;
    }

    public Set<StudentLab> getStudentLabs() {
        return studentLabs;
    }

    public void setStudentLabs(Set<StudentLab> studentLabs) {
        this.studentLabs = studentLabs;
    }

    public Date getIssueDate() {
        return issueDate;
    }

    public void setIssueDate(Date issueDate) {
        this.issueDate = issueDate;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Byte getScores() {
        return scores;
    }

    public void setScores(Byte scores) {
        this.scores = scores;
    }

    public Log getLog() {
        return log;
    }

    public void setLog(Log log) {
        this.log = log;
    }
}
