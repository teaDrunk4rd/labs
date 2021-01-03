package org.example.db.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import org.example.db.ERole;

import javax.persistence.*;
import java.util.HashMap;
import java.util.Set;

@Entity
@Table(name="roles")
public class Role {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @JsonProperty
    private Integer id;

    @Column(nullable = false)
    private String name;

    @Column(unique = true, nullable = false)
    private String key;

    @OneToMany(mappedBy="role")
    @JsonIgnore
    Set<User> users;

    private static HashMap<String, ERole> ERoles = new HashMap<String, ERole>() {{
        put("admin", ERole.ROLE_ADMIN);
        put("student", ERole.ROLE_STUDENT);
        put("teacher", ERole.ROLE_TEACHER);
    }};

    public Role() {
    }

    public Role(String name, String key) {
        this.name = name;
        this.key = key;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getKey() {
        return key;
    }

    public void setKey(String key) {
        this.key = key;
    }

    public ERole getERole() {
        return ERoles.get(this.key);
    }
}
