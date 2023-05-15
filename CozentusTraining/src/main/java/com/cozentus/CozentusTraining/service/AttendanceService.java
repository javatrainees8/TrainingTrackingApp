package com.cozentus.CozentusTraining.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cozentus.CozentusTraining.model.Attendance;
import com.cozentus.CozentusTraining.repository.AttendanceRepository;

@Service
public class AttendanceService {
	@Autowired
	private AttendanceRepository attendanceRepository;

	public List<Attendance> getAllAttendances() {
		return attendanceRepository.findAll();
	}

	public Attendance addAttendance(Attendance attendance) {
		return attendanceRepository.save(attendance);
	}

	public Attendance updateAttendance(Attendance attendance, Integer attendanceId) {
		attendance.setAttendanceId(attendanceId);
		return attendanceRepository.save(attendance);
	}

	public void deleteAttendanceById(Integer attendanceId) {
		attendanceRepository.deleteById(attendanceId);
	}

	public Optional<Attendance> geAttendanceById(Integer attendanceId) {
		return attendanceRepository.findById(attendanceId);
	}

	public void addAttendances(List<Attendance> attendances) {
		for (Attendance attendance : attendances) {
			attendanceRepository.save(attendance);
		}
	}

	public void updateAttendances(List<Attendance> attendances) {
		for (Attendance attendance : attendances) {
			attendanceRepository.updateAttendances(attendance.getAttendance(), attendance.getStudentId(), attendance.getDate(), attendance.getBatchId(), attendance.getTopicId(), attendance.getTeacherId());
		}
	}

}

