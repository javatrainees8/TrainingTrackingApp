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
@Table(name = "attendance")
public class Attendance {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "attendance_id")
	private Integer attendanceId;

	@Column(name = "student_id", nullable = true)
	private Integer studentId;

	@Temporal(TemporalType.DATE)
	@Column(name = "date")
	private Date date;

	@Column(name = "topic_id", nullable = true)
	private Integer topicId;

	@Column(name = "teacher_id", nullable = true)
	private Integer teacherId;

	@Column(name = "batch_id", nullable = true)
	private Integer batchId;

	@Column(name = "attendance")
	private Boolean attendance;

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

	public Attendance(Integer attendanceId, Integer studentId, Date date, Integer topicId, Integer teacherId,
			Integer batchId, Boolean attendance, Date createdDate, String createdBy, Date updatedDate,
			String updatedBy) {
		super();
		this.attendanceId = attendanceId;
		this.studentId = studentId;
		this.date = date;
		this.topicId = topicId;
		this.teacherId = teacherId;
		this.batchId = batchId;
		this.attendance = attendance;
		this.createdDate = createdDate;
		this.createdBy = createdBy;
		this.updatedDate = updatedDate;
		this.updatedBy = updatedBy;
	}

	public Integer getAttendanceId() {
		return attendanceId;
	}

	public void setAttendanceId(Integer attendanceId) {
		this.attendanceId = attendanceId;
	}

	public Integer getStudentId() {
		return studentId;
	}

	public void setStudentId(Integer studentId) {
		this.studentId = studentId;
	}

	public Date getDate() {
		return date;
	}

	public void setDate(Date date) {
		this.date = date;
	}

	public Integer getTopicId() {
		return topicId;
	}

	public void setTopicId(Integer topicId) {
		this.topicId = topicId;
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

	public Boolean getAttendance() {
		return attendance;
	}

	public void setAttendance(Boolean attendance) {
		this.attendance = attendance;
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
		return "Attendance [attendanceId=" + attendanceId + ", studentId=" + studentId + ", date=" + date + ", topicId="
				+ topicId + ", teacherId=" + teacherId + ", batchId=" + batchId + ", attendance=" + attendance
				+ ", createdDate=" + createdDate + ", createdBy=" + createdBy + ", updatedDate=" + updatedDate
				+ ", updatedBy=" + updatedBy + "]";
	}
	
	
	
	
}