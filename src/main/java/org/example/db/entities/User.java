package org.example.db.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;

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
    @JsonIgnore
    private String password;

    @ManyToOne
    @JoinColumn(name ="GroupId", nullable = true)
    private Group group;

    @ManyToOne
    @JoinColumn(name ="RoleId", nullable = false)
    private Role role;

    @OneToMany(mappedBy="teacher")
    private Set<Log> logs;

    @OneToMany(mappedBy="student")
    private Set<StudentLab> studentLabs;

    public User() {
    }

    public User(String name, String email, String password, Group group, Role role) {
        this.name = name;
        this.email = email;
        this.password = password;
        this.group = group;
        this.role = role;
    }

    public Integer getId() {
        return id;
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

    public Set<Log> getLogs() {
        return logs;
    }

    public void setLogs(Set<Log> logs) {
        this.logs = logs;
    }

    public Set<StudentLab> getStudentLabs() {
        return studentLabs;
    }

    public void setStudentLabs(Set<StudentLab> studentLabs) {
        this.studentLabs = studentLabs;
    }

    public byte getScoresByLog(Log log) {  // эту ссанину пришлось написать из-за отсутствия встроенной нормальной ф-ии sum
        byte sum = 0;
        for (StudentLab sl: getStudentLabs())
            if (sl.getLab().getLog() == log)
                sum += sl.getScores();

        return sum;
    }

    public String getGradeByLog(Log log) {
        return this.getGradeByLog(log, this.getScoresByLog(log));
    }

    public String getGradeByLog(Log log, byte scores) {
        if (log.getDisciplineType().getKey().equals("exam")) {
            if (scores >= 91)
                return "5";
            else if (scores >= 76)
                return "4";
            else if (scores >= 61)
                return "3";

            return "2";
        } else {
            return scores >= 61 ? "зачёт" : "незачёт";
        }
    }
}
