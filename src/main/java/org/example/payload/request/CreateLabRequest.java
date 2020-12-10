package org.example.payload.request;

import org.example.payload.response.queries.LabStudents;

import javax.validation.constraints.NotBlank;
import java.util.Date;
import java.util.List;

public class CreateLabRequest {
    @NotBlank(message = "Заполните наименование лабораторной")
    private String name;
    private Date issueDate;
    private Date expectedCompletionDate;
    private Byte scores;
    private List<LabStudents> students;
    private Integer logId;

    public CreateLabRequest() {
    }

    public CreateLabRequest(String name, Date issueDate, Date expectedCompletionDate, Byte scores, List<LabStudents> students, Integer logId) {
        this.name = name;
        this.issueDate = issueDate;
        this.expectedCompletionDate = expectedCompletionDate;
        this.scores = scores;
        this.students = students;
        this.logId = logId;
    }

    public Integer getLogId() {
        return logId;
    }

    public void setLogId(Integer logId) {
        this.logId = logId;
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

    public Date getExpectedCompletionDate() {
        return expectedCompletionDate;
    }

    public void setExpectedCompletionDate(Date expectedCompletionDate) {
        this.expectedCompletionDate = expectedCompletionDate;
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


    public String validate() {
        if (this.getStudents().stream().anyMatch(s -> s.getCompletionDate() == null && s.getCompletionScore() != 0))
            return "Заполните дату сдачи лабораторной";
        else if (this.getStudents().stream().anyMatch(s -> s.getCompletionDate() != null && s.getCompletionScore() == 0))
            return "Заполните дату сдачи лабораторной";

        return null;
    }
}
