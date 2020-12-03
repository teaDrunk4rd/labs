package org.example.payload.request;

import org.example.db.entities.User;
import org.example.db.repos.UserRepo;
import org.springframework.security.crypto.password.PasswordEncoder;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;

public class UpdateUserRequest {
    @NotBlank(message = "Заполните email")
    @Email(message = "Неверно введён email")
    private String email;
    @NotBlank(message = "Заполните имя")
    private String name;

    private Boolean changePasswordFlag;

    private String oldPassword;

    private String password;

    private String passwordConfirmation;

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Boolean getChangePasswordFlag() {
        return changePasswordFlag;
    }

    public void setChangePasswordFlag(Boolean changePasswordFlag) {
        this.changePasswordFlag = changePasswordFlag;
    }

    public String getOldPassword() {
        return oldPassword;
    }

    public void setOldPassword(String oldPassword) {
        this.oldPassword = oldPassword;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getPasswordConfirmation() {
        return passwordConfirmation;
    }

    public void setPasswordConfirmation(String passwordConfirmation) {
        this.passwordConfirmation = passwordConfirmation;
    }

    public String validate(UserRepo userRepo, User user, PasswordEncoder encoder) {
        if (userRepo.findByEmail(this.getEmail()) != null && !user.getEmail().equals(this.getEmail())) {
            return "Пользователь с таким email уже существует";
        } else if (this.getChangePasswordFlag()) {
            if (this.getPassword().equals("") || this.getPassword() == null)
                return "Заполните новый пароль";
            else if (this.getPasswordConfirmation().equals("") || this.getPasswordConfirmation() == null)
                return "Заполните подтверждение пароля";
            else if (this.getOldPassword().equals("") || this.getOldPassword() == null)
                return "Заполните старый пароль";
            else if (!this.getPassword().equals(this.getPasswordConfirmation()))
                return "Новый пароль и подтверждение пароля должны совпадать";
            else if (!encoder.matches(this.getOldPassword(), user.getPassword()))
                return "Неверный старый пароль";
        }

        return null;
    }
}
