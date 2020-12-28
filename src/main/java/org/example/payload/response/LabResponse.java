package org.example.payload.response;

import org.example.payload.LabStudents;

import java.util.Date;
import java.util.List;

public class LabResponse {
    private Integer id;
    private String name;
    private Date issueDate;
    private Date expectedCompletionDate;
    private Byte scores;
    private List<LabStudents> students;

    public LabResponse(Integer id, String name, Date issueDate, Date expectedCompletionDate, Byte scores, List<LabStudents> students) {
        this.id = id;
        this.name = name;
        this.issueDate = issueDate;
        this.expectedCompletionDate = expectedCompletionDate;
        this.scores = scores;
        this.students = students;
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

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Date getIssueDate() {
        return issueDate;
    }

    public void setIssueDate(Date issueDate) {
        this.issueDate = issueDate;
    }

    public Byte getScores() {
        return scores;
    }

    public void setScores(Byte scores) {
        this.scores = scores;
    }

    public List<LabStudents> getStudents() {
        return students;
    }

    public void setStudents(List<LabStudents> students) {
        this.students = students;
    }
}
