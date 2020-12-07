package org.example.payload.response;

import org.example.payload.response.queries.DisciplinesLabsResult;

import java.util.List;

public class DisciplineResponse {
    private String name;
    private String type;
    private String description;
    private String teacher;
    private List<DisciplinesLabsResult> labs;

    public DisciplineResponse() {
    }

    public DisciplineResponse(String name, String type, String description, String teacher, List<DisciplinesLabsResult> labs) {
        this.name = name;
        this.type = type;
        this.description = description;
        this.teacher = teacher;
        this.labs = labs;
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

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getTeacher() {
        return teacher;
    }

    public void setTeacher(String teacher) {
        this.teacher = teacher;
    }

    public List<DisciplinesLabsResult> getLabs() {
        return labs;
    }

    public void setLabs(List<DisciplinesLabsResult> labs) {
        this.labs = labs;
    }
}
