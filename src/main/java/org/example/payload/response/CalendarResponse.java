package org.example.payload.response;

import java.util.Date;

public class CalendarResponse {
    private String name;
    private String discipline;
    private Date date;
    private boolean isCompleted;

    public CalendarResponse() {
    }

    public CalendarResponse(String name, String discipline, Date date, boolean isCompleted) {
        this.name = name;
        this.discipline = discipline;
        this.date = date;
        this.isCompleted = isCompleted;
    }

    public String getDiscipline() {
        return discipline;
    }

    public void setDiscipline(String discipline) {
        this.discipline = discipline;
    }

    public boolean isCompleted() {
        return isCompleted;
    }

    public void setCompleted(boolean completed) {
        isCompleted = completed;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }
}
