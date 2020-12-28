package org.example.payload.response;

public class ProfileResponse {
    private String email;
    private String name;
    private String group;
    private Byte course;

    public ProfileResponse(String email, String name, String group, Byte course) {
        this.email = email;
        this.name = name;
        this.group = group;
        this.course = course;
    }

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

    public String getGroup() {
        return group;
    }

    public void setGroup(String group) {
        this.group = group;
    }

    public Byte getCourse() {
        return course;
    }

    public void setCourse(Byte course) {
        this.course = course;
    }
}
