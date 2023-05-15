package com.cozentus.CozentusTraining.dto;

import java.util.Date;
import java.util.List;

import com.cozentus.CozentusTraining.model.Batch;


public class ProgramBatchDTO {
	private Integer programId;

	private String programCode;

	private String programName;

	private String programDescription;

	private Integer theoryTime;

	private Integer practiceTime;

	private Date updatedDate;

	private String updatedBy;

	private Date createdDate;

	private String createdBy;

	private List<Batch> batches;

	public ProgramBatchDTO(Integer programId, String programCode, String programName, String programDescription,
			Integer theoryTime, Integer practiceTime, Date updatedDate, String updatedBy, Date createdDate,
			String createdBy, List<Batch> batches) {
		this.programId = programId;
		this.programCode = programCode;
		this.programName = programName;
		this.programDescription = programDescription;
		this.theoryTime = theoryTime;
		this.practiceTime = practiceTime;
		this.updatedDate = updatedDate;
		this.updatedBy = updatedBy;
		this.createdDate = createdDate;
		this.createdBy = createdBy;
		this.batches = batches;
	}

	public ProgramBatchDTO() {
	}

	public Integer getProgramId() {
		return programId;
	}

	public void setProgramId(Integer programId) {
		this.programId = programId;
	}

	public String getProgramCode() {
		return programCode;
	}

	public void setProgramCode(String programCode) {
		this.programCode = programCode;
	}

	public String getProgramName() {
		return programName;
	}

	public void setProgramName(String programName) {
		this.programName = programName;
	}

	public String getProgramDescription() {
		return programDescription;
	}

	public void setProgramDescription(String programDescription) {
		this.programDescription = programDescription;
	}

	public Integer getTheoryTime() {
		return theoryTime;
	}

	public void setTheoryTime(Integer theoryTime) {
		this.theoryTime = theoryTime;
	}

	public Integer getPracticeTime() {
		return practiceTime;
	}

	public void setPracticeTime(Integer practiceTime) {
		this.practiceTime = practiceTime;
	}

	public Date getUpdatedDate() {
		return updatedDate;
	}

	public void setUpdatedDate(Date updatedDate) {
		this.updatedDate = updatedDate;
	}

	public String getUpdatedBy() {
		return updatedBy;
	}

	public void setUpdatedBy(String updatedBy) {
		this.updatedBy = updatedBy;
	}

	public Date getCreatedDate() {
		return createdDate;
	}

	public void setCreatedDate(Date createdDate) {
		this.createdDate = createdDate;
	}

	public String getCreatedBy() {
		return createdBy;
	}

	public void setCreatedBy(String createdBy) {
		this.createdBy = createdBy;
	}

	public List<Batch> getBatches() {
		return batches;
	}

	public void setBatches(List<Batch> batches) {
		this.batches = batches;
	}

	@Override
	public String toString() {
		return "ProgramBatchDTO [programId=" + programId + ", programCode=" + programCode + ", programName="
				+ programName + ", programDescription=" + programDescription + ", theoryTime=" + theoryTime
				+ ", practiceTime=" + practiceTime + ", updatedDate=" + updatedDate + ", updatedBy=" + updatedBy
				+ ", createdDate=" + createdDate + ", createdBy=" + createdBy + "]";
	}

	
}
