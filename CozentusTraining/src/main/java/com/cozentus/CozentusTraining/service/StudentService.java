package com.cozentus.CozentusTraining.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cozentus.CozentusTraining.model.Student;
import com.cozentus.CozentusTraining.repository.StudentRepository;

@Service
public class StudentService {

	@Autowired
	private StudentRepository studentRepository;

	public List<Student> getStudents() {
		return this.studentRepository.findAll();
	}

	public Optional<Student> getStudentById(Integer studentId) {
		return studentRepository.findById(studentId);
	}

	public Student addStudent(Student student) {
		return studentRepository.save(student);
	}

	public Student updateStudent(Student student, Integer studentId) {
		student.setStudentId(studentId);
		return studentRepository.save(student);
	}

	public void deleteByStudentId(Integer studentId) {
		studentRepository.deleteById(studentId);
	}

	public List<Student> findstudentsByProgramId(Integer programId) {
		return studentRepository.findByProgramId(programId);

	}

	public List<Student> getStudentsByBatchId(Integer batchId) {
		return studentRepository.findByBatchId(batchId);
	}
	
	public void updateBatchIdAndProgramIdOfStudents(Integer studentId, Integer batchId, Integer programId) {
		studentRepository.updateBatchIdAndProgramIdOfStudents(studentId, batchId, programId);
	}
	
}
