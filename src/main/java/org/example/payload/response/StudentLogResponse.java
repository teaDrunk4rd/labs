package org.example.payload.response;

import java.util.List;

public class StudentLogResponse {
    private Integer logId;
    private String disciplineName;
    private String grade;
    private List<LabsResponse> labs;

    public StudentLogResponse() {
    }

    public StudentLogResponse(Integer logId, String disciplineName, String grade, List<LabsResponse> labs) {
        this.logId = logId;
        this.disciplineName = disciplineName;
        this.grade = grade;
        this.labs = labs;
    }

    public Integer getLogId() {
        return logId;
    }

    public void setLogId(Integer logId) {
        this.logId = logId;
    }

    public String getDisciplineName() {
        return disciplineName;
    }

    public void setDisciplineName(String disciplineName) {
        this.disciplineName = disciplineName;
    }

    public String getGrade() {
        return grade;
    }

    public void setGrade(String grade) {
        this.grade = grade;
    }

    public List<LabsResponse> getLabs() {
        return labs;
    }

    public void setLabs(List<LabsResponse> labs) {
        this.labs = labs;
    }
}
