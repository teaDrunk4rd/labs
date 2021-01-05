package org.example.payload.response;

public class LogResponse {
    private String name;
    private String type;
    private String description;
    private String teacher;

    public LogResponse() {
    }

    public LogResponse(String name, String type, String description, String teacher) {
        this.name = name;
        this.type = type;
        this.description = description;
        this.teacher = teacher;
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
}
