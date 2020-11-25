package org.example.entities;

import javax.persistence.*;
import java.util.Set;

@Entity
@Table(name="users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;

    private String name;

    private String email;

    private String password;

    @ManyToOne(optional = true)
    @JoinColumn(name ="GroupId")
    private Group group;

    @ManyToOne
    @JoinColumn(name ="RoleId")
    private Role role;

    @OneToMany(mappedBy="teacher")
    Set<Log> logs;

    @OneToMany(mappedBy="student")
    Set<StudentLab> studentLabs;

    public User() {
    }

    public User(String name, String email, String password, Group group, Role role) {
        this.name = name;
        this.email = email;
        this.password = password;
        this.group = group;
        this.role = role;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public Group getGroup() {
        return group;
    }

    public void setGroup(Group group) {
        this.group = group;
    }

    public Role getRole() {
        return role;
    }

    public void setRole(Role role) {
        this.role = role;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
