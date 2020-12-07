package org.example.queries;

import java.math.BigInteger;

public class DisciplinesResult {
    private String name;
    private String type;
    private BigInteger totalscores;
    private String grade;

    public DisciplinesResult() {
    }

    public DisciplinesResult(String discipline, String disciplineType, BigInteger totalScores, String grade) {
        this.name = discipline;
        this.type = disciplineType;
        this.totalscores = totalScores;
        this.grade = grade;
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
