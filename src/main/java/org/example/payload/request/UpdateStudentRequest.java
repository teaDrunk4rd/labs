package org.example.payload.request;

import org.example.payload.StudentLog;

import java.util.List;

public class UpdateStudentRequest {
    private Integer id;
    private List<StudentLog> logs;

    public UpdateStudentRequest() {
    }

    public UpdateStudentRequest(Integer id, List<StudentLog> logs) {
        this.id = id;
        this.logs = logs;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public List<StudentLog> getLogs() {
        return logs;
    }

    public void setLogs(List<StudentLog> logs) {
        this.logs = logs;
    }
}
