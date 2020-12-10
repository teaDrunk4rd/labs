package org.example.payload.response;

import java.util.Date;

public class LabsResponse {
    private Integer id;
    private String name;
    private Date issueDate;
    private Date expectedCompletionDate;
    private Byte scores;

    public LabsResponse() {
    }

    public LabsResponse(Integer id, String name, Date issueDate, Date expectedCompletionDate, Byte scores) {
        this.id = id;
        this.name = name;
        this.issueDate = issueDate;
        this.expectedCompletionDate = expectedCompletionDate;
        this.scores = scores;
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
}
