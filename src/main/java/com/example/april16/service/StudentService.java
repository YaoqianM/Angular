package com.example.april16.service;

import com.example.april16.model.Student;
import java.util.List;

public interface StudentService {
    List<Student> findAll();
    Student findById(Long id);
    Student save(Student s);
    void deleteById(Long id);
}
