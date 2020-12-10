package org.example.payload.response.queries;

import java.util.Date;

public class LabStudents {
    private String name;
    private String email;
    private Date completionDate;
    private Byte completionScore;

    public LabStudents() {
    }

    public LabStudents(String name, String email, Date completionDate, Byte completionScore) {
        this.name = name;
        this.email = email;
        this.completionDate = completionDate;
        this.completionScore = completionScore;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public Date getCompletionDate() {
        return completionDate;
    }

    public void setCompletionDate(Date completionDate) {
        this.completionDate = completionDate;
    }

    public Byte getCompletionScore() {
        return completionScore;
    }

    public void setCompletionScore(Byte completionScore) {
        this.completionScore = completionScore;
    }
}
