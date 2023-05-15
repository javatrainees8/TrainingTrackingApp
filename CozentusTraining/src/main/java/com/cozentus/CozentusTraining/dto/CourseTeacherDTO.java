package com.cozentus.CozentusTraining.dto;

import java.util.Date;
import java.util.List;

import com.cozentus.CozentusTraining.model.Teacher;


public class CourseTeacherDTO {

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
	List<Teacher> teachers;
	
	
	public CourseTeacherDTO(Integer courseId, Integer programId, String courseCode, String courseName,
			String courseDescription, Integer practiceTime, Integer theoryTime, Date createdDate, String createdBy,
			Date updatedDate, String updatedBy, List<Teacher> teachers) {
		super();
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
		this.teachers = teachers;
	}
	public CourseTeacherDTO() {
		
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
	public List<Teacher> getTeachers() {
		return teachers;
	}
	public void setTeachers(List<Teacher> teachers) {
		this.teachers = teachers;
	}
	@Override
	public String toString() {
		return "CourseTeacherDTO [courseId=" + courseId + ", programId=" + programId + ", courseCode=" + courseCode
				+ ", courseName=" + courseName + ", courseDescription=" + courseDescription + ", practiceTime="
				+ practiceTime + ", theoryTime=" + theoryTime + ", createdDate=" + createdDate + ", createdBy="
				+ createdBy + ", updatedDate=" + updatedDate + ", updatedBy=" + updatedBy + ", teachers=" + teachers
				+ "]";
	}
	
	
	
	
	
}
