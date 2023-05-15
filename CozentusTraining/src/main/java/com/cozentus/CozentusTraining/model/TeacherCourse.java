package com.cozentus.CozentusTraining.model;



import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "teacher_course")
public class TeacherCourse {
	
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column(name="teacher_course_id")
    private Integer teacherCourseId;
	@Column(name="teacher_id",nullable=true)
	private Integer teacherId;
	@Column(name="course_id",nullable=true)
	private Integer courseId;
	
	
	public TeacherCourse() {
		
	}


	public TeacherCourse(Integer teacherCourseId, Integer teacherId, Integer courseId) {
		super();
		this.teacherCourseId = teacherCourseId;
		this.teacherId = teacherId;
		this.courseId = courseId;
	}


	public Integer getTeacherCourseId() {
		return teacherCourseId;
	}


	public void setTeacherCourseId(Integer teacherCourseId) {
		this.teacherCourseId = teacherCourseId;
	}


	public Integer getTeacherId() {
		return teacherId;
	}


	public void setTeacherId(Integer teacherId) {
		this.teacherId = teacherId;
	}


	public Integer getCourseId() {
		return courseId;
	}


	public void setCourseId(Integer courseId) {
		this.courseId = courseId;
	}


	@Override
	public String toString() {
		return "TeacherCourse [teacherCourseId=" + teacherCourseId + ", teacherId=" + teacherId + ", courseId="
				+ courseId + "]";
	}

		
	
	
}