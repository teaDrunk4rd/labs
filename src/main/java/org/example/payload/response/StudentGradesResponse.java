package org.example.payload.response;

public class StudentGradesResponse {
    private Integer logId;
    private String grade;

    public StudentGradesResponse() {
    }

    public StudentGradesResponse(Integer logId, String grade) {
        this.logId = logId;
        this.grade = grade;
    }

    public Integer getLogId() {
        return logId;
    }

    public void setLogId(Integer logId) {
        this.logId = logId;
    }

    public String getGrade() {
        return grade;
    }

    public void setGrade(String grade) {
        this.grade = grade;
    }
}
