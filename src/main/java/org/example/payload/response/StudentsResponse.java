package org.example.payload.response;

public class StudentsResponse {
    private Integer id;
    private String name;
    private String email;
    private Byte scores;
    private String grade;

    public StudentsResponse() {
    }

    public StudentsResponse(Integer id, String name, String email, Byte scores, String grade) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.scores = scores;
        this.grade = grade;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
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
