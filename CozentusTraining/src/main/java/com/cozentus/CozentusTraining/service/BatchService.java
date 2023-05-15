package com.cozentus.CozentusTraining.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cozentus.CozentusTraining.model.Batch;
import com.cozentus.CozentusTraining.model.Student;
import com.cozentus.CozentusTraining.repository.BatchRepository;
import com.cozentus.CozentusTraining.repository.StudentRepository;

@Service
public class BatchService {
	@Autowired
	private BatchRepository batchRepository;

	@Autowired
	private StudentRepository studentRepository;

	public List<Batch> getAllBatches() {
		return batchRepository.findAll();
	}

	public Optional<Batch> getBatchById(int batchId) {
		return batchRepository.findById(batchId);
	}

	public Batch addBatch(Batch batch) {
		return batchRepository.save(batch);
	}

	public Batch updateBatch(Batch batch, int batchId) {
		batch.setBatchId(batchId);
		return batchRepository.save(batch);
	}

	public void deleteBatchById(int batchId) {
		batchRepository.deleteById(batchId);
	}


	public List<Student> getStudentsByProgramId(int programId) {
		return studentRepository.findByProgramId(programId);
	}

	public List<Student> getStudentsByBatchIdAndProgramId(Integer batchId, Integer programId) {
		return studentRepository.getStudentsByBatchIdAndProgramId(batchId, programId);
	}

	public void updateBatchIdAndProgramIdOfStudents(Integer studentId, Integer batchId, Integer programId) {
		studentRepository.updateBatchIdAndProgramIdOfStudents(studentId, batchId, programId);
	}
}