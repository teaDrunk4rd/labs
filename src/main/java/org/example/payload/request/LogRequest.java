package org.example.payload.request;


import javax.validation.constraints.NotNull;

public class LogRequest {
    private int id;
    @NotNull(message = "Заполните дисциплину")
    private Integer disciplineId;
    @NotNull(message = "Заполните тип дисциплины")
    private Integer disciplineTypeId;
    @NotNull(message = "Заполните группу")
    private Integer groupId;
    @NotNull(message = "Заполните преподавателя")
    private Integer teacherId;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public Integer getDisciplineId() {
        return disciplineId;
    }

    public void setDisciplineId(Integer disciplineId) {
        this.disciplineId = disciplineId;
    }

    public Integer getDisciplineTypeId() {
        return disciplineTypeId;
    }

    public void setDisciplineTypeId(Integer disciplineTypeId) {
        this.disciplineTypeId = disciplineTypeId;
    }

    public Integer getGroupId() {
        return groupId;
    }

    public void setGroupId(Integer groupId) {
        this.groupId = groupId;
    }

    public Integer getTeacherId() {
        return teacherId;
    }

    public void setTeacherId(Integer teacherId) {
        this.teacherId = teacherId;
    }
}
