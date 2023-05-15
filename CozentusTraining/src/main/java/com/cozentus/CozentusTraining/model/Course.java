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
@Table(name="course")
public class Course {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name="course_id")
	private  Integer courseId; 
	@Column(name="program_id")
	private  Integer programId;
	@Column(name="course_code")
	private String courseCode;
	@Column(name="course_name")
	private String courseName;
	@Column(name="course_description")
	private String courseDescription;
	@Column(name="practice_time")
	private Integer practiceTime;
	@Column(name="theory_time")
	private Integer theoryTime;
	@JsonIgnore
	@Column(name="created_date")
	private Date createdDate;
	@JsonIgnore
	@Column(name="updated_date")
	private Date updatedDate;
	@Column(name="updated_by")
	@JsonIgnore
	private String updatedBy;
	@JsonIgnore
	@Column(name="created_by")
	private String createdBy;
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
	public String getCreatedBy() {
		return createdBy;
	}
	public void setCreatedBy(String createdBy) {
		this.createdBy = createdBy;
	}
	public Course(Integer courseId, Integer programId, String courseCode, String courseName, String courseDescription,
			Integer practiceTime, Integer theoryTime, Date createdDate, Date updatedDate, String updatedBy,
			String createdBy) {
		super();
		this.courseId = courseId;
		this.programId = programId;
		this.courseCode = courseCode;
		this.courseName = courseName;
		this.courseDescription = courseDescription;
		this.practiceTime = practiceTime;
		this.theoryTime = theoryTime;
		this.createdDate = createdDate;
		this.updatedDate = updatedDate;
		this.updatedBy = updatedBy;
		this.createdBy = createdBy;
	}
	public Course() {
		
	}
	@Override
	public String toString() {
		return "Course [courseId=" + courseId + ", programId=" + programId + ", courseCode=" + courseCode
				+ ", courseName=" + courseName + ", courseDescription=" + courseDescription + ", practiceTime="
				+ practiceTime + ", theoryTime=" + theoryTime + ", createdDate=" + createdDate + ", updatedDate="
				+ updatedDate + ", updatedBy=" + updatedBy + ", createdBy=" + createdBy + "]";
	}
	
	
	
}
