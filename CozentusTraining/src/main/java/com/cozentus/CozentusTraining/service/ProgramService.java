package com.cozentus.CozentusTraining.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cozentus.CozentusTraining.model.Program;
import com.cozentus.CozentusTraining.repository.ProgramRepository;

@Service
public class ProgramService {
	
	@Autowired
	private ProgramRepository programRepository;
	

	public Program addProgram(Program program) {
		return programRepository.save(program);
	}
	public Program updateProgram(Program program,Integer programId) {
		program.setProgramId(programId);
		return programRepository.save(program);
	}
	public List<Program> getPrograms(){
		List<Program> li = (List<Program>) programRepository.findAll();
		return li;
	}
	
	public void deleteById(Integer programId) {
		programRepository.deleteById(programId);
	}
	
		
	public Optional<Program> getProgramById(Integer programId) {
		return programRepository.findById(programId);
		
		}
		

	
}
