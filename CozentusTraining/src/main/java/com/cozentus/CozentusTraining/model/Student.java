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
@Table(name="student")
public class Student {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "student_id")
	private Integer studentId;
	@Column(name = "program_id",nullable=true)
	private Integer programId;
	@Column(name = "batch_id",nullable=true)
	private Integer batchId;
	@Column(name = "student_code")
	private String studentCode;
	@Column(name = "student_name")
	private String studentName;
	@Column(name = "student_email")
	private String studentEmail;
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
	
	public Student() {
		
	}

	public Student(Integer studentId, Integer programId, Integer batchId, String studentCode, String studentName,
			String studentEmail, Date createdDate, String createdBy, Date updatedDate, String updatedBy) {
		super();
		this.studentId = studentId;
		this.programId = programId;
		this.batchId = batchId;
		this.studentCode = studentCode;
		this.studentName = studentName;
		this.studentEmail = studentEmail;
		this.createdDate = createdDate;
		this.createdBy = createdBy;
		this.updatedDate = updatedDate;
		this.updatedBy = updatedBy;
	}
	public Integer getStudentId() {
		return studentId;
	}
	public void setStudentId(Integer studentId) {
		this.studentId = studentId;
	}
	public Integer getProgramId() {
		return programId;
	}
	public void setProgramId(Integer programId) {
		this.programId = programId;
	}
	public Integer getBatchId() {
		return batchId;
	}
	public void setBatchId(Integer batchId) {
		this.batchId = batchId;
	}
	public String getStudentCode() {
		return studentCode;
	}
	public void setStudentCode(String studentCode) {
		this.studentCode = studentCode;
	}
	public String getStudentName() {
		return studentName;
	}
	public void setStudentName(String studentName) {
		this.studentName = studentName;
	}
	public String getStudentEmail() {
		return studentEmail;
	}
	public void setStudentEmail(String studentEmail) {
		this.studentEmail = studentEmail;
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
	@Override
	public String toString() {
		return "Student [studentId=" + studentId + ", programId=" + programId + ", batchId=" + batchId
				+ ", studentCode=" + studentCode + ", studentName=" + studentName + ", studentEmail=" + studentEmail
				+ ", createdDate=" + createdDate + ", createdBy=" + createdBy + ", updatedDate=" + updatedDate
				+ ", updatedBy=" + updatedBy + "]";
	}
	
	

}
