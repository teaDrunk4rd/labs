package org.example.payload.response.queries;

import java.math.BigInteger;

public class DisciplinesResult {
    private String name;
    private String type;
    private Integer logid;
    private BigInteger totalscores;
    private String grade;

    public DisciplinesResult() {
    }

    public DisciplinesResult(String name, String type, Integer logid, BigInteger totalscores, String grade) {
        this.name = name;
        this.type = type;
        this.logid = logid;
        this.totalscores = totalscores;
        this.grade = grade;
    }

    public Integer getLogid() {
        return logid;
    }

    public void setLogid(Integer logid) {
        this.logid = logid;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public BigInteger getTotalscores() {
        return totalscores;
    }

    public void setTotalscores(BigInteger totalscores) {
        this.totalscores = totalscores;
    }

    public String getGrade() {
        return grade;
    }

    public void setGrade(String grade) {
        this.grade = grade;
    }
}
