package org.example.payload.response;

import org.example.payload.response.queries.LabStudents;

import java.util.Date;
import java.util.List;

public class LabResponse extends LabsResponse {
    private List<LabStudents> students;

    public LabResponse(Integer id, String name, Date issueDate, Date expectedCompletionDate, Byte scores, List<LabStudents> students) {
        super(id, name, issueDate, expectedCompletionDate, scores);
        this.students = students;
    }

    public List<LabStudents> getStudents() {
        return students;
    }

    public void setStudents(List<LabStudents> students) {
        this.students = students;
    }
}
