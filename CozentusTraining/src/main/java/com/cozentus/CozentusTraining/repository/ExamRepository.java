package com.cozentus.CozentusTraining.repository;

import java.util.Date;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.cozentus.CozentusTraining.model.EvaluationName;

public interface ExamRepository extends JpaRepository<EvaluationName, Integer>{
	@Modifying
	@Query("UPDATE EvaluationName SET marksSecured=:marksSecured where  totalMarks=:totalMarks AND submissionDate=:submissionDate  AND evaluationName=:evaluationName  AND studentId=:studentId  AND batchId=:batchId  AND courseId=:courseId  AND teacherId=:teacherId")
	void updateMarks(@Param ("marksSecured") Integer marksSecured,@Param ("totalMarks") Integer totalMarks,@Param ("submissionDate") Date submissionDate, @Param ("evaluationName") String evaluationName,
			 @Param ("studentId") Integer studentId, @Param ("batchId") Integer batchId, @Param ("courseId") Integer courseId, @Param ("teacherId") Integer teacherId);

	@Query("FROM EvaluationName where type=:type")
	List<EvaluationName> getAllExams(@Param("type") String type);
}



