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
@Table(name="teacher")
public class Teacher {
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column(name="teacher_id")
	private Integer teacherId;
	
	@Column(name="teacher_code")
	private String teacherCode;
	@Column(name="teacher_name")
	private String teacherName;
	@Column(name="teacher_email")
	private String teacherEmail;
	@JsonIgnore
	@Column(name="updated_by")
	private String updatedBy;
	@JsonIgnore
	@Column(name="updated_date")
	private Date updatedDate;
	@JsonIgnore
	@Column(name="created_by")
	private String createdBy;
	@JsonIgnore
	@Column(name="created_date")
	private Date createdDate;
	
	
	public Teacher() {
		
	}


	public Teacher(Integer teacherId, String teacherCode, String teacherName, String teacherEmail, String updatedBy,
			Date updatedDate, String createdBy, Date createdDate) {
		super();
		this.teacherId = teacherId;
		this.teacherCode = teacherCode;
		this.teacherName = teacherName;
		this.teacherEmail = teacherEmail;
		this.updatedBy = updatedBy;
		this.updatedDate = updatedDate;
		this.createdBy = createdBy;
		this.createdDate = createdDate;
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


	@Override
	public String toString() {
		return "Teacher [teacherId=" + teacherId + ", teacherCode=" + teacherCode + ", teacherName=" + teacherName
				+ ", teacherEmail=" + teacherEmail + ", updatedBy=" + updatedBy + ", updatedDate=" + updatedDate
				+ ", createdBy=" + createdBy + ", createdDate=" + createdDate + "]";
	}


	

	
}
