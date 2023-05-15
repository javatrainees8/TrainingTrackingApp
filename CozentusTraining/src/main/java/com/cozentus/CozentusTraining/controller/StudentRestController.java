package com.cozentus.CozentusTraining.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.cozentus.CozentusTraining.model.Student;
import com.cozentus.CozentusTraining.service.StudentService;

import jakarta.transaction.Transactional;


@CrossOrigin(origins="*", allowedHeaders = "*")
@Transactional
@RestController
@RequestMapping("/student")
//@PreAuthorize("hasAuthority('ROLE_ADMIN')")
public class StudentRestController {

	@Autowired
	private StudentService studentService;

	@GetMapping("/all")
	public ResponseEntity<List<Student>> getAllStudents() {
		return ResponseEntity.ok(studentService.getStudents());
	}

	@PostMapping("/add")
	public ResponseEntity<Student> addingStudent(@RequestBody Student student) {
		return ResponseEntity.ok(studentService.addStudent(student));
	}

	@PostMapping("/update/{studentId}")
	public ResponseEntity<Student> updatingStudent(@RequestBody Student student,
			@PathVariable("studentId") Integer studentId) {
		return ResponseEntity.ok(studentService.updateStudent(student, studentId));
	}

	@DeleteMapping("/delete/{studentId}")
	public ResponseEntity<Void> deleteStudentById(@PathVariable("studentId") Integer studentId) {
		Optional<Student> student = studentService.getStudentById(studentId);
		if (student.isPresent()) {
			studentService.deleteByStudentId(studentId);
			return ResponseEntity.ok().build();
		} else {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
		}
	}

//	@GetMapping("/byprogramId/{programId}")
//	public ResponseEntity<List<Student>> getStudentsByProgramId(@PathVariable("programId") Integer programId) {
//		return ResponseEntity.ok(studentService.findstudentsByProgramId(programId));
//	}
//
//	@GetMapping("/bybatchId/{batchId}")
//	public ResponseEntity<List<Student>> getStudentsByBatchId(@PathVariable("batchId") Integer batchId) {
//		return ResponseEntity.ok(studentService.getStudentsByBatchId(batchId));
//	}
	
}
