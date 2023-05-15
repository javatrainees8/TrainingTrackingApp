package com.cozentus.CozentusTraining.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.cozentus.CozentusTraining.model.Student;

public interface StudentRepository extends JpaRepository<Student, Integer>  {

	public List<Student> findByProgramId(int programId);

	public List<Student> findByBatchId(Integer batchId);

	

	@Query("FROM Student where batchId=:batchId AND programId=:programId")
	List<Student> getStudentsByBatchIdAndProgramId(@Param("batchId") Integer batchId,
			@Param("programId") Integer programId);
	@Modifying
	@Query("UPDATE Student SET batchId=:batchId, programId=:programId where studentId=:studentId")
	void updateBatchIdAndProgramIdOfStudents(@Param("studentId") Integer studentId, @Param("batchId") Integer batchId,
			@Param("programId") Integer programId);

}
