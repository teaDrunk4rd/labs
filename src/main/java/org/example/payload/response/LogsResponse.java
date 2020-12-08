package org.example.payload.response;

public class LogsResponse {
    private int id;
    private String discipline;
    private String group;

    public LogsResponse() {
    }

    public LogsResponse(int id, String discipline, String group) {
        this.id = id;
        this.discipline = discipline;
        this.group = group;
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
}
