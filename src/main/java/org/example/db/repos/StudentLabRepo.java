package org.example.db.repos;

import org.example.db.entities.Lab;
import org.example.db.entities.StudentLab;
import org.example.db.entities.User;
import org.springframework.data.repository.CrudRepository;

public interface StudentLabRepo extends CrudRepository<StudentLab, Integer> {
    StudentLab findByStudentAndLab(User user, Lab lab);

    void saveAndFlush(StudentLab studentLab);
}
