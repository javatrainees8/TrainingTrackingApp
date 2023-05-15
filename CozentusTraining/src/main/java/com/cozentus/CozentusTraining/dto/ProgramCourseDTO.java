package com.cozentus.CozentusTraining.dto;

import java.util.Date;
import java.util.List;

import com.cozentus.CozentusTraining.model.Course;

public class ProgramCourseDTO {
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

	List<Course> selectedCourses;

	public ProgramCourseDTO(Integer programId, String programCode, String programName, String programDescription,
			Integer theoryTime, Integer practiceTime, Date updatedDate, String updatedBy, Date createdDate,
			String createdBy, List<Course> selectedCourses) {

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
		this.selectedCourses = selectedCourses;
	}

	public ProgramCourseDTO() {

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

	public List<Course> getSelectedCourses() {
		return selectedCourses;
	}

	public void setSelectedCourses(List<Course> selectedCourses) {
		this.selectedCourses = selectedCourses;
	}

	@Override
	public String toString() {
		return "ProgramCourseDTO [programId=" + programId + ", programCode=" + programCode + ", programName="
				+ programName + ", programDescription=" + programDescription + ", theoryTime=" + theoryTime
				+ ", practiceTime=" + practiceTime + ", updatedDate=" + updatedDate + ", updatedBy=" + updatedBy
				+ ", createdDate=" + createdDate + ", createdBy=" + createdBy + ", selectedCourses=" + selectedCourses + "]";
	}

	

}
