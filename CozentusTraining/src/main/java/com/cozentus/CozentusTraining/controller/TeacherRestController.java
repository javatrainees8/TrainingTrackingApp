package com.cozentus.CozentusTraining.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.cozentus.CozentusTraining.dto.TeacherCourseDTO;
import com.cozentus.CozentusTraining.model.Course;
import com.cozentus.CozentusTraining.model.Teacher;
import com.cozentus.CozentusTraining.service.CourseService;
import com.cozentus.CozentusTraining.service.CredentialService;
import com.cozentus.CozentusTraining.service.TeacherCourseService;
import com.cozentus.CozentusTraining.service.TeacherService;

import jakarta.transaction.Transactional;

@CrossOrigin(origins="*",allowedHeaders = "*")
@Transactional
@RestController
@RequestMapping("/teacher")
//@PreAuthorize("hasAuthority('ROLE_ADMIN')")
public class TeacherRestController {

	@Autowired
	private TeacherService teacherService;

	@Autowired
	private CourseService courseService;

	@Autowired
	private TeacherCourseService teacherCourseService;
	
	@Autowired
	private CredentialService credentialService;

	@PostMapping("/add")
	public ResponseEntity<?> addTeacher(@RequestBody TeacherCourseDTO teacherCourse) {
		Teacher teacher = new Teacher();

		teacher.setTeacherCode(teacherCourse.getTeacherCode());
		teacher.setTeacherName(teacherCourse.getTeacherName());
		teacher.setTeacherEmail(teacherCourse.getTeacherEmail());
		teacher.setUpdatedBy(teacherCourse.getUpdatedBy());
		teacher.setUpdatedDate(teacherCourse.getUpdatedDate());
		teacher.setCreatedBy(teacherCourse.getCreatedBy());
		teacher.setCreatedDate(teacherCourse.getCreatedDate());
		
		List<Course> courses = teacherCourse.getSelectedCourses();
	
		
		teacherService.addTeacher(teacher);
		credentialService.addTeacherCredential(teacher);
		teacherCourseService.addTeacherCourse(teacher, courses);
		return ResponseEntity.ok().build();
	}


	@PostMapping("/update/{teacherId}")
	public ResponseEntity<Teacher> updateTeacher(@RequestBody Teacher teacher, @PathVariable("teacherId") Integer teacherId) {
		return ResponseEntity.ok(teacherService.updateTeacher(teacher, teacherId));
	}

	@DeleteMapping("/delete/{teacherId}")
	public ResponseEntity<Void> deleteTeacherById(@PathVariable("teacherId") Integer teacherId) {
		teacherService.deleteTeacherById(teacherId);
		return ResponseEntity.ok().build();
	}

	@GetMapping("/all")
	public ResponseEntity<List<TeacherCourseDTO>> getAllTeachers() {
		List<TeacherCourseDTO> teacherCourses = new ArrayList<>();
		List<Teacher> teachers = teacherService.getTeachers();

		for (Teacher teacher : teachers) {

			Integer teacherId = teacher.getTeacherId();
			List<Course> courses = new ArrayList<>();
			List<Integer> courseIds = teacherCourseService.getCourseIdsByTeacherId(teacherId);

			for (Integer courseId : courseIds) {
				Course course = courseService.getCourseById(courseId).get();
				courses.add(course);
			}
			TeacherCourseDTO teacherCourse = new TeacherCourseDTO();
			
			teacherCourse.setSelectedCourses(courses);
			teacherCourse.setTeacherId(teacher.getTeacherId());
			teacherCourse.setTeacherCode(teacher.getTeacherCode());
			teacherCourse.setTeacherName(teacher.getTeacherName());
			teacherCourse.setTeacherEmail(teacher.getTeacherEmail());
			teacherCourse.setCreatedBy(teacher.getCreatedBy());
			teacherCourse.setCreatedDate(teacher.getCreatedDate());
			teacherCourse.setUpdatedBy(teacher.getUpdatedBy());
			teacherCourse.setUpdatedDate(teacher.getUpdatedDate());
			
			teacherCourses.add(teacherCourse);
		}

		System.out.println(teacherCourses);
		return ResponseEntity.ok(teacherCourses);
	}

	
	@GetMapping("/all-courses")
	public List<Course> getAllCourses() {
		return courseService.getCourses();
	}
	
	
}
