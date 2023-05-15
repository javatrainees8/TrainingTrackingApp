package com.cozentus.CozentusTraining.model;

import java.util.Date;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;

@Entity
@Table(name = "evaluation_name")
public class EvaluationName {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "evaluation_id")
	private Integer evaluationId;

	@Column(name = "course_id", nullable = true)
	private Integer courseId;

	@Column(name = "teacher_id", nullable = true)
	private Integer teacherId;

	@Column(name = "batch_id", nullable = true)
	private Integer batchId;

	@Column(name = "student_id", nullable = true)
	private Integer studentId;

	
	@Column(name = "type")
	private String type;

	@Temporal(TemporalType.DATE)
	@Column(name = "submission_date")
	private Date submissionDate;

	@Column(name = "evaluation_name")
	private String evaluationName;

	@Column(name = "total_marks")
	private Integer totalMarks;

	@Column(name = "marks_secured")
	private Integer marksSecured;

	@JsonIgnore
	@Column(name = "created_date")
	private Date createdDate;

	@JsonIgnore
	@Column(name = "created_by")
	private String createdBy;

	@JsonIgnore
	@Column(name = "updated_date")
	private Date updatedDate;

	@JsonIgnore
	@Column(name = "updated_by")
	private String updatedBy;

	public EvaluationName(Integer evaluationId, Integer courseId, Integer teacherId, Integer batchId,
			Integer studentId, String type, Date submissionDate, String evaluationName, Integer totalMarks,
			Integer marksSecured, Date createdDate, String createdBy, Date updatedDate, String updatedBy) {
		this.evaluationId = evaluationId;
		this.courseId = courseId;
		this.teacherId = teacherId;
		this.batchId = batchId;
		this.studentId = studentId;
		this.type = type;
		this.submissionDate = submissionDate;
		this.evaluationName = evaluationName;
		this.totalMarks = totalMarks;
		this.marksSecured = marksSecured;
		this.createdDate = createdDate;
		this.createdBy = createdBy;
		this.updatedDate = updatedDate;
		this.updatedBy = updatedBy;
	}

	public EvaluationName() {
	}

	public Integer getEvaluationId() {
		return evaluationId;
	}

	public void setEvaluationId(Integer evaluationId) {
		this.evaluationId = evaluationId;
	}

	public Integer getCourseId() {
		return courseId;
	}

	public void setCourseId(Integer courseId) {
		this.courseId = courseId;
	}

	public Integer getTeacherId() {
		return teacherId;
	}

	public void setTeacherId(Integer teacherId) {
		this.teacherId = teacherId;
	}

	public Integer getBatchId() {
		return batchId;
	}

	public void setBatchId(Integer batchId) {
		this.batchId = batchId;
	}

	public Integer getStudentId() {
		return studentId;
	}

	public void setStudentId(Integer studentId) {
		this.studentId = studentId;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public Date getSubmissionDate() {
		return submissionDate;
	}

	public void setSubmissionDate(Date submissionDate) {
		this.submissionDate = submissionDate;
	}

	public String getEvaluationName() {
		return evaluationName;
	}

	public void setEvaluationName(String evaluationName) {
		this.evaluationName = evaluationName;
	}

	public Integer getTotalMarks() {
		return totalMarks;
	}

	public void setTotalMarks(Integer totalMarks) {
		this.totalMarks = totalMarks;
	}

	public Integer getMarksSecured() {
		return marksSecured;
	}

	public void setMarksSecured(Integer marksSecured) {
		this.marksSecured = marksSecured;
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
		return "EvaluationName [evaluationId=" + evaluationId + ", courseId=" + courseId + ", teacherId=" + teacherId
				+ ", batchId=" + batchId + ", studentId=" + studentId + ", type=" + type + ", submissionDate="
				+ submissionDate + ", evaluationName=" + evaluationName + ", totalMarks=" + totalMarks
				+ ", marksSecured=" + marksSecured + ", createdDate=" + createdDate + ", createdBy=" + createdBy
				+ ", updatedDate=" + updatedDate + ", updatedBy=" + updatedBy + "]";
	}

}

