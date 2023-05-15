package com.cozentus.CozentusTraining.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cozentus.CozentusTraining.model.Teacher;
import com.cozentus.CozentusTraining.repository.TeacherRepository;

@Service
public class TeacherService {
	@Autowired
	private TeacherRepository teacherRepository;

	public List<Teacher> getTeachers() {
		return teacherRepository.findAll();
	}


	public Teacher addTeacher(Teacher teacher) {
		return teacherRepository.save(teacher);
	}

	public Teacher updateTeacher(Teacher teacher, Integer teacherId) {
		teacher.setTeacherId(teacherId);
		return teacherRepository.save(teacher);
	}

	public void deleteTeacherById(Integer teacherId) {
		teacherRepository.deleteById(teacherId);
	}
	
	public Optional<Teacher> getTeacherById(Integer teacherId) {
		return teacherRepository.findById(teacherId);
	}
}
