package org.example.db.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;

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

    @Column(nullable = true)
    private Date expectedCompletionDate;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false, columnDefinition = "smallint default 0")
    private Byte scores = 0;

    @ManyToOne
    @JsonIgnore
    @JoinColumn(name ="LogId", nullable = false)
    private Log log;

    @OneToMany(mappedBy="lab", cascade = CascadeType.REMOVE)
    @JsonIgnore
    private Set<StudentLab> studentLabs;

    public Lab() {
    }

    public Lab(Date issueDate, Date expectedCompletionDate, String name, Byte scores, Log log) {
        this.issueDate = issueDate;
        this.expectedCompletionDate = expectedCompletionDate;
        this.name = name;
        this.scores = scores;
        this.log = log;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Date getExpectedCompletionDate() {
        return expectedCompletionDate;
    }

    public void setExpectedCompletionDate(Date expectedCompletionDate) {
        this.expectedCompletionDate = expectedCompletionDate;
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
