package com.cozentus.CozentusTraining.controller;

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

import com.cozentus.CozentusTraining.model.Course;
import com.cozentus.CozentusTraining.service.CourseService;

import jakarta.transaction.Transactional;



@CrossOrigin(origins="*", allowedHeaders = "*")
@Transactional
@RestController
@RequestMapping("/course")
//@PreAuthorize("hasAuthority('ROLE_ADMIN')")
public class CourseRestController {

	@Autowired
	private CourseService courseService;

	@GetMapping("/all")
	public ResponseEntity<List<Course>> getAllCourses() {
		return ResponseEntity.ok(courseService.getCourses());
	}

	@PostMapping("/add")
	public ResponseEntity<Course> addCourse(@RequestBody Course course) {
		return ResponseEntity.ok(courseService.addCourse(course));
	}

	@PostMapping("/update/{courseId}")
	public ResponseEntity<Course> updateCourse(@RequestBody Course course, @PathVariable("courseId") Integer courseId) {
		return ResponseEntity.ok(courseService.updateCourse(course, courseId));
	}

	@DeleteMapping("/delete/{courseId}")
	public ResponseEntity<Void> deleteCourseById(@PathVariable("courseId") Integer courseId) {
		courseService.deleteCourseById(courseId);
		return ResponseEntity.ok().build();
	}
	

//	@GetMapping("/{programId}")
//	public ResponseEntity<List<Course>> getCoursesByProgramId(@PathVariable("programId") Integer programId) {
//		return ResponseEntity.ok(courseService.getcourseByProgramId(programId));
//	}
//	
	
}
