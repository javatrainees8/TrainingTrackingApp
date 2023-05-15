package com.cozentus.CozentusTraining.model;


import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name="batch_program")
public class BatchProgram {
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column(name="batch_program_id")
	private Integer batchProgramId;
	@Column(name="batch_id",nullable=true)
	private Integer batchId;
	@Column(name="program_id",nullable=true)
	private Integer programId;
	public Integer getBatchProgramId() {
		return batchProgramId;
	}
	public void setBatchProgramId(Integer batchProgramId) {
		this.batchProgramId = batchProgramId;
	}
	public Integer getBatchId() {
		return batchId;
	}
	public void setBatchId(Integer batchId) {
		this.batchId = batchId;
	}
	public Integer getProgramId() {
		return programId;
	}
	public void setProgramId(Integer programId) {
		this.programId = programId;
	}
	
	public BatchProgram() {
		
	}
	
	public BatchProgram(Integer batchId, Integer programId) {
		super();
		this.batchId = batchId;
		this.programId = programId;
	}
	public BatchProgram(Integer batchProgramId, Integer batchId, Integer programId) {
		super();
		this.batchProgramId = batchProgramId;
		this.batchId = batchId;
		this.programId = programId;
	}
	@Override
	public String toString() {
		return "BatchProgram [batchProgramId=" + batchProgramId + ", batchId=" + batchId + ", programId=" + programId
				+ "]";
	}
	
}
