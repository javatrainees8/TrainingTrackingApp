package com.cozentus.CozentusTraining.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.cozentus.CozentusTraining.model.BatchProgram;

public interface BatchProgramRepository extends JpaRepository<BatchProgram, Integer>{

	@Query("SELECT programId FROM BatchProgram where batchId=:batchId")
	List<Integer> getProgramByBatchId(@Param("batchId") Integer batchId);
}
