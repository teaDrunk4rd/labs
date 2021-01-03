package org.example.payload.request;

import org.example.db.ERole;
import org.example.db.entities.User;
import org.example.db.repos.RoleRepo;
import org.example.db.repos.UserRepo;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

public class UserRequest {
    private Integer id;
    @NotBlank(message = "Заполните имя")
    private String name;
    @NotBlank(message = "Заполните email")
    @Email(message = "Неверно введён email")
    private String email;
    @NotNull(message = "Заполните роль")
    private Integer roleId;
    private Integer groupId;
    private String password;

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

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public Integer getRoleId() {
        return roleId;
    }

    public void setRoleId(Integer roleId) {
        this.roleId = roleId;
    }

    public Integer getGroupId() {
        return groupId;
    }

    public void setGroupId(Integer groupId) {
        this.groupId = groupId;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String validate(UserRepo userRepo, RoleRepo roleRepo, User user) {
        if (user != null && userRepo.findByEmail(this.getEmail()) != null && !user.getEmail().equals(this.getEmail()))
            return "Пользователь с таким email уже существует";
        else if (roleRepo.findById(this.roleId).get().getERole() == ERole.ROLE_STUDENT && groupId == null)
            return "Заполните группу";
        else if (id == null && (password == null || password.equals("")))
            return "Заполните пароль";

        return null;
    }
}
