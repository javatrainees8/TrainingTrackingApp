package com.cozentus.CozentusTraining.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.cozentus.CozentusTraining.model.TeacherCourse;

public interface TeacherCourseRepository extends JpaRepository<TeacherCourse, Integer>{

	@Query("SELECT courseId FROM TeacherCourse where teacherId=:teacherId")
	List<Integer> getCourseIdsByTeacherId(@Param("teacherId") Integer teacherId);
	
	@Query("SELECT teacherId FROM TeacherCourse where courseId=:courseId")
	List<Integer> getTeacherIdsByCourseId(@Param("courseId") Integer wcourseId);
}
