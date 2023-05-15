package com.cozentus.CozentusTraining.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cozentus.CozentusTraining.model.EvaluationName;
import com.cozentus.CozentusTraining.repository.ExamRepository;

import java.util.List;
import java.util.Optional;
@Service
public class ExamService {

	@Autowired
	private ExamRepository examRepository;

	public List<EvaluationName> getAllExams() {
		return examRepository.getAllExams("Exam");
	}

	public EvaluationName addExam(EvaluationName evaluationName) {
		evaluationName.setType("Exam");
		return examRepository.save(evaluationName);
	}

	public EvaluationName updateExam(EvaluationName evaluationName, Integer evaluationId) {
		evaluationName.setEvaluationId(evaluationId);
		return examRepository.save(evaluationName);
	}

	public void deleteExamById(Integer evaluationId) {
		examRepository.deleteById(evaluationId);
	}

	public Optional<EvaluationName> getExamById(Integer id) {
		return examRepository.findById(id);
	}
	
	public void addMarks(List<EvaluationName> marks) {
		for (EvaluationName mark : marks) {
			examRepository.save(mark);
		}
	}

	public void updateMarks(List<EvaluationName> marks) {
        
		for (EvaluationName mark : marks) {
			examRepository.updateMarks(mark.getMarksSecured(),mark.getTotalMarks(),mark.getSubmissionDate(),mark.getEvaluationName(), mark.getStudentId(), mark.getBatchId(),mark.getCourseId(),mark.getTeacherId());
		}
	}

}

