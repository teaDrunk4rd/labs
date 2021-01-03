package org.example.payload.request;

import javax.validation.constraints.NotBlank;
import java.util.List;

public class GroupRequest {
    private Integer id;
    @NotBlank(message = "Заполните наименование")
    private String name;
    @NotBlank(message = "Заполните курс")
    private Byte course;
    private Integer directionId;

    public GroupRequest() {
    }

    public GroupRequest(Integer id, String name, Byte course, Integer directionId) {
        this.id = id;
        this.name = name;
        this.course = course;
        this.directionId = directionId;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Byte getCourse() {
        return course;
    }

    public void setCourse(Byte course) {
        this.course = course;
    }

    public Integer getDirectionId() {
        return directionId;
    }

    public void setDirectionId(Integer directionId) {
        this.directionId = directionId;
    }
}
