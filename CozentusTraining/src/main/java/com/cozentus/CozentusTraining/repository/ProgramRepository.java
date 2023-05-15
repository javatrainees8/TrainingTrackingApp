package com.cozentus.CozentusTraining.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.cozentus.CozentusTraining.model.Program;

public interface ProgramRepository extends JpaRepository<Program, Integer>{
	
}
