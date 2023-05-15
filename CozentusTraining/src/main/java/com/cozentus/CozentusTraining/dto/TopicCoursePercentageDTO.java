package com.cozentus.CozentusTraining.dto;

import java.util.Date;
import java.util.List;

import com.cozentus.CozentusTraining.model.Topic;


public class TopicCoursePercentageDTO {
	private Integer courseId;

	private Integer programId;

	private String courseCode;

	private String courseName;

	private String courseDescription;

	private Integer practiceTime;

	private Integer theoryTime;

	private Date createdDate;

	private String createdBy;

	private Date updatedDate;

	private String updatedBy;

	Double courseCompletion;
	List<Topic> completedTopics;
	List<Topic> inProgressTopics;

	public TopicCoursePercentageDTO(Integer courseId, Integer programId, String courseCode, String courseName,
			String courseDescription, Integer practiceTime, Integer theoryTime, Date createdDate, String createdBy,
			Date updatedDate, String updatedBy, Double courseCompletion, List<Topic> completedTopics,
			List<Topic> inProgressTopics) {

		this.courseId = courseId;
		this.programId = programId;
		this.courseCode = courseCode;
		this.courseName = courseName;
		this.courseDescription = courseDescription;
		this.practiceTime = practiceTime;
		this.theoryTime = theoryTime;
		this.createdDate = createdDate;
		this.createdBy = createdBy;
		this.updatedDate = updatedDate;
		this.updatedBy = updatedBy;
		this.courseCompletion = courseCompletion;
		this.completedTopics = completedTopics;
		this.inProgressTopics = inProgressTopics;
	}

	public TopicCoursePercentageDTO() {
		
	}

	public Integer getCourseId() {
		return courseId;
	}

	public void setCourseId(Integer courseId) {
		this.courseId = courseId;
	}

	public Integer getProgramId() {
		return programId;
	}

	public void setProgramId(Integer programId) {
		this.programId = programId;
	}

	public String getCourseCode() {
		return courseCode;
	}

	public void setCourseCode(String courseCode) {
		this.courseCode = courseCode;
	}

	public String getCourseName() {
		return courseName;
	}

	public void setCourseName(String courseName) {
		this.courseName = courseName;
	}

	public String getCourseDescription() {
		return courseDescription;
	}

	public void setCourseDescription(String courseDescription) {
		this.courseDescription = courseDescription;
	}

	public Integer getPracticeTime() {
		return practiceTime;
	}

	public void setPracticeTime(Integer practiceTime) {
		this.practiceTime = practiceTime;
	}

	public Integer getTheoryTime() {
		return theoryTime;
	}

	public void setTheoryTime(Integer theoryTime) {
		this.theoryTime = theoryTime;
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

	public Double getCourseCompletion() {
		return courseCompletion;
	}

	public void setCourseCompletion(Double courseCompletion) {
		this.courseCompletion = courseCompletion;
	}

	public List<Topic> getCompletedTopics() {
		return completedTopics;
	}

	public void setCompletedTopics(List<Topic> completedTopics) {
		this.completedTopics = completedTopics;
	}

	public List<Topic> getInProgressTopics() {
		return inProgressTopics;
	}

	public void setInProgressTopics(List<Topic> inProgressTopics) {
		this.inProgressTopics = inProgressTopics;
	}

	@Override
	public String toString() {
		return "TopicCoursePercentageDTO [courseId=" + courseId + ", programId=" + programId + ", courseCode="
				+ courseCode + ", courseName=" + courseName + ", courseDescription=" + courseDescription
				+ ", practiceTime=" + practiceTime + ", theoryTime=" + theoryTime + ", createdDate=" + createdDate
				+ ", createdBy=" + createdBy + ", updatedDate=" + updatedDate + ", updatedBy=" + updatedBy
				+ ", courseCompletion=" + courseCompletion + ", completedTopics=" + completedTopics
				+ ", inProgressTopics=" + inProgressTopics + "]";
	}

	

}
