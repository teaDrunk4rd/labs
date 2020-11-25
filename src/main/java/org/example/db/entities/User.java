package org.example.db.entities;

import javax.persistence.*;
import java.util.Set;

@Entity
@Table(name="users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;

    @Column(nullable = true)
    private String name;

    @Column(nullable = false, unique = true)
    private String email;

    @Column(nullable = false)
    private String password;

    @ManyToOne
    @JoinColumn(name ="GroupId", nullable = true)
    private Group group;

    @ManyToOne
    @JoinColumn(name ="RoleId", nullable = false)
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
