package org.example.payload.response;

import java.util.Date;

public class DisciplinesLabs {
    private String name;
    private Date issueDate;
    private Date expectedCompletionDate;
    private Byte scores;
    private Date completionDate;
    private Byte completionScores;

    public DisciplinesLabs() {
    }

    public DisciplinesLabs(String name, Date issueDate, Date expectedCompletionDate, Byte scores, Date completionDate, Byte completionScores) {
        this.name = name;
        this.issueDate = issueDate;
        this.expectedCompletionDate = expectedCompletionDate;
        this.scores = scores;
        this.completionDate = completionDate;
        this.completionScores = completionScores;
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

    public Date getCompletionDate() {
        return completionDate;
    }

    public void setCompletionDate(Date completionDate) {
        this.completionDate = completionDate;
    }

    public Byte getCompletionScores() {
        return completionScores;
    }

    public void setCompletionScores(Byte completionScores) {
        this.completionScores = completionScores;
    }
}
