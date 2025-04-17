package com.example.april16.controller;

import com.example.april16.model.Student;
import com.example.april16.service.StudentService;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/students")
@CrossOrigin(origins = "http://localhost:4200")
public class StudentController {
    private final StudentService svc;
    public StudentController(StudentService svc) { this.svc = svc; }

    @GetMapping
    public List<Student> list() { return svc.findAll(); }

    @GetMapping("/{id}")
    public Student getOne(@PathVariable Long id) { return svc.findById(id); }

    @PostMapping
    public Student create(@RequestBody Student s) { return svc.save(s); }

    @PutMapping("/{id}")
    public Student update(@PathVariable Long id, @RequestBody Student s) {
        s.setId(id);
        return svc.save(s);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) { svc.deleteById(id); }
}
