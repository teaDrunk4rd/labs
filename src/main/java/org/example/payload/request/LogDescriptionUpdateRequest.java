package org.example.payload.request;

import javax.validation.constraints.NotBlank;

public class LogDescriptionUpdateRequest {
    private int id;
    @NotBlank(message="Заполните описание")
    private String description;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }
}
