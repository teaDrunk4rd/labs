package org.example.payload.response.queries;

import java.util.Date;

public class DisciplinesLabsResult {
    private String name;
    private Date issuedate;
    private Byte scores;
    private Date completiondate;
    private Byte completionscores;

    public DisciplinesLabsResult() {
    }

    public DisciplinesLabsResult(String name, Date issuedate, Byte scores, Date completiondate, Byte completionscores) {
        this.name = name;
        this.issuedate = issuedate;
        this.scores = scores;
        this.completiondate = completiondate;
        this.completionscores = completionscores;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Date getIssuedate() {
        return issuedate;
    }

    public void setIssuedate(Date issuedate) {
        this.issuedate = issuedate;
    }

    public Byte getScores() {
        return scores;
    }

    public void setScores(Byte scores) {
        this.scores = scores;
    }

    public Date getCompletiondate() {
        return completiondate;
    }

    public void setCompletiondate(Date completiondate) {
        this.completiondate = completiondate;
    }

    public Byte getCompletionscores() {
        return completionscores;
    }

    public void setCompletionscores(Byte completionscores) {
        this.completionscores = completionscores;
    }
}
