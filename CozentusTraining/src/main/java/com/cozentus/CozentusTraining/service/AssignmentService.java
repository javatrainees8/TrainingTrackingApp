package com.cozentus.CozentusTraining.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cozentus.CozentusTraining.model.EvaluationName;
import com.cozentus.CozentusTraining.repository.AssignmentRepository;

@Service
public class AssignmentService {

	@Autowired
	private AssignmentRepository assignmentRepository;

	public List<EvaluationName> getAllAssignments() {
		return assignmentRepository.getAllAssignments("Assignment");
	}

	public EvaluationName addAssignment(EvaluationName evaluationName) {
		evaluationName.setType("Assignment");
		return assignmentRepository.save(evaluationName);

	}

	public EvaluationName updateAssignment(EvaluationName evaluationName, Integer evaluationId) {
		evaluationName.setEvaluationId(evaluationId);
		return assignmentRepository.save(evaluationName);
	}

	public void deleteAssignmentById(Integer evaluationId) {
		assignmentRepository.deleteById(evaluationId);
	}

	public Optional<EvaluationName> getAssignmentById(Integer evaluationId) {
		return assignmentRepository.findById(evaluationId);
	}

}
