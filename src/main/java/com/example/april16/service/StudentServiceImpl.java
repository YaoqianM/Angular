package com.example.april16.service;

import com.example.april16.model.Student;
import com.example.april16.repo.StudentRepository;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class StudentServiceImpl implements StudentService {
    private final StudentRepository repo;
    public StudentServiceImpl(StudentRepository repo) { this.repo = repo; }

    @Override public List<Student> findAll()         { return repo.findAll(); }
    @Override public Student findById(Long id)       { return repo.findById(id).orElse(null); }
    @Override public Student save(Student s)         { return repo.save(s); }
    @Override public void deleteById(Long id)        { repo.deleteById(id); }
}
