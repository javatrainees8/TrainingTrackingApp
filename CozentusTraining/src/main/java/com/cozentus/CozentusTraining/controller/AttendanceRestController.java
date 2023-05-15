package com.cozentus.CozentusTraining.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.cozentus.CozentusTraining.model.Attendance;
import com.cozentus.CozentusTraining.model.Batch;
import com.cozentus.CozentusTraining.model.Course;
import com.cozentus.CozentusTraining.model.Program;
import com.cozentus.CozentusTraining.model.Student;
import com.cozentus.CozentusTraining.service.AttendanceService;
import com.cozentus.CozentusTraining.service.BatchProgramService;
import com.cozentus.CozentusTraining.service.BatchService;
import com.cozentus.CozentusTraining.service.CourseService;
import com.cozentus.CozentusTraining.service.ProgramService;
import com.cozentus.CozentusTraining.service.TopicService;
import com.cozentus.CozentusTraining.model.Topic;

import jakarta.transaction.Transactional;


@CrossOrigin(origins="*", allowedHeaders = "*")
@Transactional
@RestController
@RequestMapping("/attendance")
//@PreAuthorize("hasAuthority('ROLE_TEACHER')")
public class AttendanceRestController {

	@Autowired
	private BatchProgramService batchProgramService;
	@Autowired
	private AttendanceService attendanceService;

	@Autowired
	private CourseService courseService;

	@Autowired
	private TopicService topicService;
	
	@Autowired
	private ProgramService programService;
	
	@Autowired
	private BatchService batchService;

	@GetMapping("/all")
	public ResponseEntity<List<Attendance>> getAllAttendances() {
		return ResponseEntity.ok(attendanceService.getAllAttendances());
	}

	/*
	 * @PostMapping("/add") public ResponseEntity<Attendance>
	 * addAttendance(@RequestBody Attendance attendance) { return
	 * ResponseEntity.ok(attendanceService.addAttendance(attendance)); }
	 * 
	 * @PostMapping("/update/{attendanceId}") public ResponseEntity<Attendance>
	 * updateAttendance(@RequestBody Attendance attendance,
	 * 
	 * @PathVariable("attendanceId") Integer attendanceId) { return
	 * ResponseEntity.ok(attendanceService.updateAttendance(attendance,
	 * attendanceId));
	 * 
	 * }
	 * 
	 * @DeleteMapping("/delete/{attendanceId}") public ResponseEntity<Void>
	 * deleteAttendanceById(@PathVariable("attendanceId") Integer attendanceId) {
	 * Optional<Attendance> attendance =
	 * attendanceService.geAttendanceById(attendanceId); if (attendance.isPresent())
	 * { attendanceService.deleteAttendanceById(attendanceId); return
	 * ResponseEntity.ok().build(); } else { return
	 * ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build(); }
	 * 
	 * }
	 */
	
	@GetMapping("/programs/{batchId}")
	public ResponseEntity<List<Program>> getAllProgramsByBatchId(@PathVariable("batchId") Integer batchId) {
		List<Program> programs = new ArrayList<>();
		List<Integer> programIds = batchProgramService.getProgramsByBatchId(batchId);
		for (Integer programId : programIds) {
			Program program = programService.getProgramById(programId).get();
			programs.add(program);
		}

		return ResponseEntity.ok(programs);
	}
	
	@GetMapping("/courses/{programId}")
	public ResponseEntity<List<Course>> getCoursesByProgramId(@PathVariable("programId") Integer programId) {
		return ResponseEntity.ok(courseService.getcourseByProgramId(programId));
	}

	@GetMapping("/topics/{courseId}")
	public ResponseEntity<List<Topic>> getTopicsByCourseId(@PathVariable("courseId") Integer courseId) {
		
		List<Topic> topics_by_courseId=topicService.getTopicsByCourseId(courseId);
		return ResponseEntity.ok(topics_by_courseId);
	}

	@GetMapping("/topic-percentage/{topicId}")
	public ResponseEntity<Void> updateTopicPercentage(@RequestBody Integer topicPercentage,
			@PathVariable("topicId") Integer topicId) {
		topicService.updateTopicPercentageCompleted(topicPercentage, topicId);
		return ResponseEntity.ok().build();
	}

	@PostMapping("/add-attendances")
	public ResponseEntity<Void> addAttendances(@RequestBody List<Attendance> attendances) {
		attendanceService.addAttendances(attendances);

		return ResponseEntity.ok().build();
	}

	@Transactional
	@PostMapping("/update-attendances")
	public ResponseEntity<Void> updateAttendances(@RequestBody List<Attendance> attendances) {
		attendanceService.updateAttendances(attendances);

		return ResponseEntity.ok().build();
	}
	@GetMapping("/student/{batchId}/{programId}")
	public ResponseEntity<List<Student>> getStudentsByBatchIdAndProgramId(@PathVariable("batchId") Integer batchId,
			@PathVariable("programId") Integer programId) {
		return ResponseEntity.ok(batchService.getStudentsByBatchIdAndProgramId(batchId, programId));

	}
	@GetMapping("/batch/all")
	public ResponseEntity<List<Batch>> getAllBatches() {
		return ResponseEntity.ok(batchService.getAllBatches());
	}

	

	@GetMapping("/program/all")
	public ResponseEntity<List<Program>> getAllPrograms() {
		return ResponseEntity.ok(programService.getPrograms());
	}

	@GetMapping("/course/all")
	public ResponseEntity<List<Course>> getAllCourses() {
		return ResponseEntity.ok(courseService.getCourses());
	}

	@GetMapping("/topic/all")
	public List<Topic> getAllTopics() {
		return topicService.getAllTopics();
	}

	
	
}
