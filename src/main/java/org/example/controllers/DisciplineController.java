package org.example.controllers;

import org.example.queries.DisciplinesResult;
import org.example.security.UserDetailsGetter;
import org.hibernate.Session;
import org.hibernate.transform.Transformers;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.persistence.EntityManager;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/")
public class DisciplineController {
    @Autowired
    private UserDetailsGetter userDetailsGetter;
    @Autowired
    private EntityManager entityManager;

    @GetMapping("disciplines")
    public Iterable<?> index() {
        Integer userId = userDetailsGetter.getUserDetails().getId();
        Session session = entityManager.unwrap(Session.class);

        return session.createSQLQuery("" +
            "with current_student_labs as (\n" +
            "    select\n" +
            "        student_labs.id,\n" +
            "        student_labs.scores,\n" +
            "        labs.log_id\n" +
            "    from student_labs\n" +
            "    join labs on student_labs.lab_id = labs.id\n" +
            "    where student_id = :id\n" +
            "), disciplines_results as (\n" +
            "    select disciplines.name as discipline,\n" +
            "        logs.discipline_type_id,\n" +
            "        sum(current_student_labs.scores) as total_scores\n" +
            "    from logs\n" +
            "    join disciplines on logs.discipline_id = disciplines.id\n" +
            "    left join current_student_labs on logs.id = current_student_labs.log_id\n" +
            "    where logs.group_id = (\n" +
            "        select group_id\n" +
            "        from users\n" +
            "        where users.id = :id\n" +
            "    )\n" +
            "    group by discipline, logs.discipline_type_id\n" +
            ")\n" +
            "select\n" +
            "    disciplines_results.discipline as name,\n" +
            "    discipline_types.name as type,\n" +
            "    disciplines_results.total_scores as totalScores,\n" +
            "    case\n" +
            "        when discipline_types.key = 'credit' and disciplines_results.total_scores >= 61 then 'зачёт'\n" +
            "        when discipline_types.key = 'credit' and disciplines_results.total_scores < 61 then 'незачёт'\n" +
            "        when discipline_types.key = 'exam' and disciplines_results.total_scores >= 91 then '5'\n" +
            "        when discipline_types.key = 'exam' and disciplines_results.total_scores >= 76 then '4'\n" +
            "        when discipline_types.key = 'exam' and disciplines_results.total_scores >= 61 then '3'\n" +
            "        else '2'\n" +
            "    end as grade\n" +
            "from disciplines_results\n" +
            "join discipline_types on disciplines_results.discipline_type_id = discipline_types.id")
                .setParameter("id", userId)
                .setResultTransformer(Transformers.aliasToBean(DisciplinesResult.class)).list();  // use hql
    }
}
