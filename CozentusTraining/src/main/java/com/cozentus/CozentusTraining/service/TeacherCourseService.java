package com.cozentus.CozentusTraining.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cozentus.CozentusTraining.model.Course;
import com.cozentus.CozentusTraining.model.Teacher;
import com.cozentus.CozentusTraining.model.TeacherCourse;
import com.cozentus.CozentusTraining.repository.TeacherCourseRepository;

@Service
public class TeacherCourseService {
	@Autowired
	private TeacherCourseRepository teacherCourseRepository;

	public void addTeacherCourse(Teacher teacher, List<Course> courses) {
		for (Course course : courses) {
			TeacherCourse teacherCourse = new TeacherCourse();

			teacherCourse.setTeacherId(teacher.getTeacherId());
			teacherCourse.setCourseId(course.getCourseId());

			teacherCourseRepository.save(teacherCourse);
		}
	}

	public List<Integer> getCourseIdsByTeacherId(Integer teacherId) {
		return teacherCourseRepository.getCourseIdsByTeacherId(teacherId);
	}

	public List<Integer> getTeacherIdsByCourseId(Integer courseId) {
		return teacherCourseRepository.getTeacherIdsByCourseId(courseId);
	}
	
}
