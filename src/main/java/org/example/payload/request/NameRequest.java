package org.example.payload.request;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

public class NameRequest {
    private Integer id;
    @NotBlank(message = "Заполните наименование")
    private String name;

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
}
