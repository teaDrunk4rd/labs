package org.example.payload.response;

public class LogsResponse {
    private int id;
    private String discipline;
    private String disciplineType;
    private String group;
    private Byte course;
    private String teacher;

    public LogsResponse() {
    }

    public LogsResponse(int id, String discipline, String disciplineType, String group, Byte course, String teacher) {
        this.id = id;
        this.discipline = discipline;
        this.disciplineType = disciplineType;
        this.group = group;
        this.course = course;
        this.teacher = teacher;
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

    public String getDisciplineType() {
        return disciplineType;
    }

    public void setDisciplineType(String disciplineType) {
        this.disciplineType = disciplineType;
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

    public String getTeacher() {
        return teacher;
    }

    public void setTeacher(String teacher) {
        this.teacher = teacher;
    }
}
