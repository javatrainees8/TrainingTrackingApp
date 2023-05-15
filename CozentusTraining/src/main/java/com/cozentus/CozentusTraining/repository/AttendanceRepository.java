package com.cozentus.CozentusTraining.repository;

import java.util.Date;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.cozentus.CozentusTraining.model.Attendance;

public interface AttendanceRepository extends JpaRepository<Attendance, Integer>{
	@Modifying
	@Query("UPDATE Attendance SET attendance=:attendance where studentId=:studentId AND date=:date AND batchId=:batchId AND topicId=:topicId AND teacherId=:teacherId")
	void updateAttendances(@Param("attendance") Boolean attendance, @Param("studentId") Integer studentId,
			@Param("date") Date date, @Param("batchId") Integer batchId, @Param("topicId") Integer topicId,
			@Param("teacherId") Integer teacherId);
}
