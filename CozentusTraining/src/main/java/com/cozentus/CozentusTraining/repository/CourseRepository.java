package com.cozentus.CozentusTraining.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.cozentus.CozentusTraining.model.Course;


public interface CourseRepository extends JpaRepository<Course, Integer> {

	List<Course> findByProgramId(Integer programId);

	
	@Modifying
	@Query("UPDATE Course SET programId=:programId where courseId=:courseId")
	void updateCourseProgramId(@Param("programId") Integer programId,@Param("courseId") Integer courseId);
	
}
