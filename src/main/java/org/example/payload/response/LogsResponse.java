package org.example.payload.response;

public class LogsResponse {
    private int id;
    private String discipline;
    private String group;
    private Byte course;

    public LogsResponse() {
    }

    public LogsResponse(int id, String discipline, String group, Byte course) {
        this.id = id;
        this.discipline = discipline;
        this.group = group;
        this.course = course;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getDiscipline() {
        return discipline;
    }

    public void setDiscipline(String discipline) {
        this.discipline = discipline;
    }

    public String getGroup() {
        return group;
    }

    public void setGroup(String group) {
        this.group = group;
    }

    public Byte getCourse() {
        return course;
    }

    public void setCourse(Byte course) {
        this.course = course;
    }
}
