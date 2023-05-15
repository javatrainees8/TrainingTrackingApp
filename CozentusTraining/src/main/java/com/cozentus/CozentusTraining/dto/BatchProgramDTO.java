package com.cozentus.CozentusTraining.dto;


import java.util.Date;
import java.util.List;

import com.cozentus.CozentusTraining.model.Batch;
import com.cozentus.CozentusTraining.model.Program;


public class BatchProgramDTO {

	private Integer batchId;
	private String batchCode;
	private String batchName;
	private Date batchStartdate;
	private Date createdDate;
	private String createdBy;
	private Date updatedDate;
	private String updatedBy;

	private List<Program> programs;

	public BatchProgramDTO(Integer batchId, String batchCode, String batchName, Date batchStartdate, Date createdDate,
			String createdBy, Date updatedDate, String updatedBy, List<Program> programs) {
		super();
		this.batchId = batchId;
		this.batchCode = batchCode;
		this.batchName = batchName;
		this.batchStartdate = batchStartdate;
		this.createdDate = createdDate;
		this.createdBy = createdBy;
		this.updatedDate = updatedDate;
		this.updatedBy = updatedBy;
		this.programs = programs;
	}

	public BatchProgramDTO() {
		super();
		
	}

	


	public Integer getBatchId() {
		return batchId;
	}

	public BatchProgramDTO(Integer batchId, String batchCode, String batchName, Date batchStartdate,
		List<Program> programs) {
	super();
	this.batchId = batchId;
	this.batchCode = batchCode;
	this.batchName = batchName;
	this.batchStartdate = batchStartdate;
	this.programs = programs;
}

	public void setBatchId(Integer batchId) {
		this.batchId = batchId;
	}

	public String getBatchCode() {
		return batchCode;
	}

	public void setBatchCode(String batchCode) {
		this.batchCode = batchCode;
	}

	public String getBatchName() {
		return batchName;
	}

	public void setBatchName(String batchName) {
		this.batchName = batchName;
	}

	public Date getBatchStartdate() {
		return batchStartdate;
	}

	public void setBatchStartdate(Date batchStartdate) {
		this.batchStartdate = batchStartdate;
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

	public List<Program> getPrograms() {
		return programs;
	}

	public void setPrograms(List<Program> programs) {
		this.programs = programs;
	}

	@Override
	public String toString() {
		return "BatchProgramDTO [batchId=" + batchId + ", batchCode=" + batchCode + ", batchName=" + batchName
				+ ", batchStartdate=" + batchStartdate + ", createdDate=" + createdDate + ", createdBy=" + createdBy
				+ ", updatedDate=" + updatedDate + ", updatedBy=" + updatedBy + ", programs=" + programs + "]";
	}

	

}
