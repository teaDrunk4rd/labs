package org.example.payload.response;

public class DisciplinesResponse {
    private Integer logId;
    private String name;
    private String type;
    private Byte totalScores;
    private String grade;

    public DisciplinesResponse() {
    }

    public DisciplinesResponse(Integer logId, String name, String type, Byte totalScores, String grade) {
        this.logId = logId;
        this.name = name;
        this.type = type;
        this.totalScores = totalScores;
        this.grade = grade;
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

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public Byte getTotalScores() {
        return totalScores;
    }

    public void setTotalScores(Byte totalScores) {
        this.totalScores = totalScores;
    }

    public String getGrade() {
        return grade;
    }

    public void setGrade(String grade) {
        this.grade = grade;
    }
}
