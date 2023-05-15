package com.cozentus.CozentusTraining.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cozentus.CozentusTraining.model.Batch;
import com.cozentus.CozentusTraining.model.BatchProgram;
import com.cozentus.CozentusTraining.model.Program;
import com.cozentus.CozentusTraining.repository.BatchProgramRepository;
import java.util.List;

@Service
public class BatchProgramService {
	
	@Autowired
	private BatchProgramRepository batchProgramRepository;
	
	public void addBatchProgram(Batch batch, List<Program> programs) {
		for(Program program : programs) {
			BatchProgram batchProgram = new BatchProgram(batch.getBatchId(), program.getProgramId());
			batchProgramRepository.save(batchProgram);
		}
	}

	public List<Integer> getProgramsByBatchId(Integer batchId) {
		List<Integer> programIds = batchProgramRepository.getProgramByBatchId(batchId);
		return programIds;
	}

	
	public BatchProgram addBatchProgramId(BatchProgram batchProgram) {
		return batchProgramRepository.save(batchProgram);
	}
}
