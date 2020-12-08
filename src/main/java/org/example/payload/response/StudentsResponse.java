package org.example.payload.response;

public class StudentsResponse {
    private String name;
    private String email;
    private Byte scores;
    private String grade;

    public StudentsResponse() {
    }

    public StudentsResponse(String name, String email, Byte scores, String grade) {
        this.name = name;
        this.email = email;
        this.scores = scores;
        this.grade = grade;
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

    public Byte getScores() {
        return scores;
    }

    public void setScores(Byte scores) {
        this.scores = scores;
    }

    public String getGrade() {
        return grade;
    }

    public void setGrade(String grade) {
        this.grade = grade;
    }
}
