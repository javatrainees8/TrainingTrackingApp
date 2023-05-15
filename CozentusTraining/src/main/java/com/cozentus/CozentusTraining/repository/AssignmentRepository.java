package com.cozentus.CozentusTraining.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.cozentus.CozentusTraining.model.EvaluationName;

public interface AssignmentRepository extends JpaRepository<EvaluationName, Integer>{
	@Query("FROM EvaluationName where type=:type")
	List<EvaluationName> getAllAssignments(@Param("type") String type);

}
