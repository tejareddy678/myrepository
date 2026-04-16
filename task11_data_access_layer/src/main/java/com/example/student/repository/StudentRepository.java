package com.example.student.repository;

import com.example.student.model.Student;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface StudentRepository extends JpaRepository<Student, Long> {
    
    // Custom query method to find students by department with pagination and sorting
    Page<Student> findByDepartment(String department, Pageable pageable);
    
    // Custom query method to find students older than or equal to a certain age
    Page<Student> findByAgeGreaterThanEqual(int age, Pageable pageable);
}
