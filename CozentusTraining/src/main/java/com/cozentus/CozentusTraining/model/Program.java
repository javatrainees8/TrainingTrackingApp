package com.cozentus.CozentusTraining.model;

import java.util.Date;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name="program")
public class Program {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name="program_id")
	private Integer programId;
	
	@Column(name="program_code")
	private String programCode;
	
	@Column(name="program_name")
	private String programName;
	
	@Column(name="program_description")
	private String programDescription;
	
	@Column(name="theory_time")
	private Integer theoryTime;
	@Column(name="practice_time")
	private Integer practiceTime;
	@JsonIgnore
	@Column(name="updated_date")
	private Date updatedDate;
	@JsonIgnore
	@Column(name="updated_by")
	private String updatedBy;
	@JsonIgnore
	@Column(name="created_date")
	private Date createdDate;
	@JsonIgnore
	@Column(name="created_by")
	private String createdBy;
	
	public Program() {
		
	}
	
	public Program(Integer programId, String programCode, String programName, String programDescription,
			Integer theoryTime, Integer practiceTime, Date updatedDate, String updatedBy, Date createdDate,
			String createdBy) {
		super();
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
	@Override
	public String toString() {
		return "Program [programId=" + programId + ", programCode=" + programCode + ", programName=" + programName
				+ ", programDescription=" + programDescription + ", theoryTime=" + theoryTime + ", practiceTime="
				+ practiceTime + ", updatedDate=" + updatedDate + ", updatedBy=" + updatedBy + ", createdDate="
				+ createdDate + ", createdBy=" + createdBy + "]";
	}
	
	
	
}
	
	