package com.example.crud;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@CrossOrigin(origins = "http://127.0.0.1:5500")
@RequestMapping("/student")

public class StudentController {
	@Autowired
	private final StudentRepository studentRepository;
	
	
	public StudentController(StudentRepository studentRepository) {
		this.studentRepository = studentRepository;
	}
	
	@GetMapping
	public List<Student> getAllStudents(){
		return studentRepository.findAll();
	}
				
	@PostMapping
	public Student addStudent (@RequestBody Student student) {
		return studentRepository.save(student);
	}
	
}
