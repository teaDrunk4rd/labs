package org.example.payload.response;

import java.util.Date;

public class LabsResponse {
    private String name;
    private Date issueDate;
    private Byte scores;

    public LabsResponse() {
    }

    public LabsResponse(String name, Date issueDate, Byte scores) {
        this.name = name;
        this.issueDate = issueDate;
        this.scores = scores;
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
