package org.example.payload.request;

import org.example.payload.LabStudents;

import java.util.Date;
import java.util.List;

public class UpdateLabRequest extends CreateLabRequest {
    private Integer id;

    public UpdateLabRequest(String name, Date issueDate, Date expectedCompletionDate, Byte scores, List<LabStudents> students, Integer logId, Integer id) {
        super(name, issueDate, expectedCompletionDate, scores, students, logId);
        this.id = id;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }
}
