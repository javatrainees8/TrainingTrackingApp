package com.cozentus.CozentusTraining.model;


import jakarta.persistence.Entity;

import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import java.util.Date;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.Column;

@Entity
@Table(name="topic")
public class Topic {
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column(name="topic_id")
	private Integer topicId;
	@Column(name="course_id",nullable=true)
	private Integer courseId;
	@Column(name="topic_code")
	private String topicCode;
	@Column(name="order_num")
	private Integer orderNum;
	@Column(name="topic_name")
	private String  topicName;
	@Column(name="topic_percentage_completed")
	private Integer topicPercentageCompleted;
	@Column(name="topic_summary")
	private String topicSummary;
	@Column(name="theory_time")
	private Integer theoryTime;
	@Column(name="practical_time")
	private Integer practicalTime;
	private String content;
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
	
	public Topic() {
		
		
		
	}
	
	
	
	public Topic(Integer topicId, Integer courseId, String topicCode, Integer orderNum, String topicName,
			Integer topicPercentageCompleted, String topicSummary, Integer theoryTime, Integer practicalTime, String content,
			Date updatedDate, String updatedBy, Date createdDate, String createdBy) {
		super();
		this.topicId = topicId;
		this.courseId = courseId;
		this.topicCode = topicCode;
		this.orderNum = orderNum;
		this.topicName = topicName;
		this.topicPercentageCompleted = topicPercentageCompleted;
		this.topicSummary = topicSummary;
		this.theoryTime = theoryTime;
		this.practicalTime = practicalTime;
		this.content = content;
		this.updatedDate = updatedDate;
		this.updatedBy = updatedBy;
		this.createdDate = createdDate;
		this.createdBy = createdBy;
	}
	

	public Integer getTopicId() {
		return topicId;
	}

	public void setTopicId(Integer topicId) {
		this.topicId = topicId;
	}

	public Integer getCourseId() {
		return courseId;
	}

	public void setCourseId(Integer courseId) {
		this.courseId = courseId;
	}

	public String getTopicCode() {
		return topicCode;
	}

	public void setTopicCode(String topicCode) {
		this.topicCode = topicCode;
	}

	public Integer getOrderNum() {
		return orderNum;
	}

	public void setOrderNum(Integer orderNum) {
		this.orderNum = orderNum;
	}

	public String getTopicName() {
		return topicName;
	}

	public void setTopicName(String topicName) {
		this.topicName = topicName;
	}

	public Integer getTopicPercentageCompleted() {
		return topicPercentageCompleted;
	}

	public void setTopicPercentageCompleted(Integer topicPercentageCompleted) {
		this.topicPercentageCompleted = topicPercentageCompleted;
	}

	public String getTopicSummary() {
		return topicSummary;
	}

	public void setTopicSummary(String topicSummary) {
		this.topicSummary = topicSummary;
	}

	public Integer getTheoryTime() {
		return theoryTime;
	}

	public void setTheoryTime(Integer theoryTime) {
		this.theoryTime = theoryTime;
	}

	public Integer getPracticalTime() {
		return practicalTime;
	}

	public void setPracticalTime(Integer practicalTime) {
		this.practicalTime = practicalTime;
	}

	public String getContent() {
		return content;
	}

	public void setContent(String content) {
		this.content = content;
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
		return "Topic [topicId=" + topicId + ", courseId=" + courseId + ", topicCode=" + topicCode + ", orderNum="
				+ orderNum + ", topicName=" + topicName + ", topicPercentageCompleted=" + topicPercentageCompleted
				+ ", topicSummary=" + topicSummary + ", theoryTime=" + theoryTime + ", practicalTime=" + practicalTime
				+ ", content=" + content + ", updatedDate=" + updatedDate + ", updatedBy=" + updatedBy
				+ ", createdDate=" + createdDate + ", createdBy=" + createdBy + "]";
	}

}
