package com.cozentus.CozentusTraining.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;

import com.cozentus.CozentusTraining.model.Batch;

public interface BatchRepository extends JpaRepository<Batch, Integer> {
	
}
