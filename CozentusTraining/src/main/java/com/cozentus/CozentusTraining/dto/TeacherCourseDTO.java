package com.cozentus.CozentusTraining.dto;


import java.util.Date;
import java.util.List;

import com.cozentus.CozentusTraining.model.Course;


public class TeacherCourseDTO {
	private Integer teacherId;


	private String teacherCode;


	private String teacherName;


	private String teacherEmail;


	private String updatedBy;


	private Date updatedDate;

	private String createdBy;

	private Date createdDate;
	
	List<Course> selectedCourses;

	public TeacherCourseDTO(Integer teacherId, String teacherCode, String teacherName, String teacherEmail,
			String updatedBy, Date updatedDate, String createdBy, Date createdDate, List<Course> selectedCourses) {
		super();
		this.teacherId = teacherId;
		this.teacherCode = teacherCode;
		this.teacherName = teacherName;
		this.teacherEmail = teacherEmail;
		this.updatedBy = updatedBy;
		this.updatedDate = updatedDate;
		this.createdBy = createdBy;
		this.createdDate = createdDate;
		this.selectedCourses = selectedCourses;
	}

	public TeacherCourseDTO() {
		super();
		// TODO Auto-generated constructor stub
	}

	public Integer getTeacherId() {
		return teacherId;
	}

	public void setTeacherId(Integer teacherId) {
		this.teacherId = teacherId;
	}

	public String getTeacherCode() {
		return teacherCode;
	}

	public void setTeacherCode(String teacherCode) {
		this.teacherCode = teacherCode;
	}

	public String getTeacherName() {
		return teacherName;
	}

	public void setTeacherName(String teacherName) {
		this.teacherName = teacherName;
	}

	public String getTeacherEmail() {
		return teacherEmail;
	}

	public void setTeacherEmail(String teacherEmail) {
		this.teacherEmail = teacherEmail;
	}

	public String getUpdatedBy() {
		return updatedBy;
	}

	public void setUpdatedBy(String updatedBy) {
		this.updatedBy = updatedBy;
	}

	public Date getUpdatedDate() {
		return updatedDate;
	}

	public void setUpdatedDate(Date updatedDate) {
		this.updatedDate = updatedDate;
	}

	public String getCreatedBy() {
		return createdBy;
	}

	public void setCreatedBy(String createdBy) {
		this.createdBy = createdBy;
	}

	public Date getCreatedDate() {
		return createdDate;
	}

	public void setCreatedDate(Date createdDate) {
		this.createdDate = createdDate;
	}

	public List<Course> getSelectedCourses() {
		return selectedCourses;
	}

	public void setSelectedCourses(List<Course> selectedCourses) {
		this.selectedCourses = selectedCourses;
	}

	@Override
	public String toString() {
		return "TeacherCourseDTO [teacherId=" + teacherId + ", teacherCode=" + teacherCode + ", teacherName="
				+ teacherName + ", teacherEmail=" + teacherEmail + ", updatedBy=" + updatedBy + ", updatedDate="
				+ updatedDate + ", createdBy=" + createdBy + ", createdDate=" + createdDate + ", selectedCourses=" + selectedCourses
				+ "]";
	}

	
	
	
}
