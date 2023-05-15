package com.cozentus.CozentusTraining.service;


import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.cozentus.CozentusTraining.model.Course;
import com.cozentus.CozentusTraining.repository.CourseRepository;



@Component
public class CourseService {
	@Autowired
	private CourseRepository courseRepository;
	
	public Course addCourse(Course course) {
		return courseRepository.save(course);
	}
	public Course updateCourse(Course course,Integer courseId) {
		course.setCourseId(courseId);
		return courseRepository.save(course);
	}
	public List<Course> getCourses(){
		List<Course> course_list = (List<Course>) courseRepository.findAll();
		return course_list;
	}
	public Optional<Course> getCourseById(Integer course_id){
		Optional<Course> coursebyId =  courseRepository.findById(course_id);
		return coursebyId;
	}
	public void deleteCourseById(Integer course_id) {
		courseRepository.deleteById(course_id);
	}
	public List<Course> getcourseByProgramId(Integer program_id) {
		return courseRepository.findByProgramId(program_id);
	}
	
	public void updateProgramIdOfCourses(List<Course> courses, int programId) {
		for(Course course : courses) {
			courseRepository.updateCourseProgramId( programId, course.getCourseId());
		}

	
	}
	
}
