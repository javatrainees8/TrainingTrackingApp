package com.cozentus.CozentusTraining.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.cozentus.CozentusTraining.model.Batch;
import com.cozentus.CozentusTraining.model.Course;
import com.cozentus.CozentusTraining.model.EvaluationName;
import com.cozentus.CozentusTraining.model.Program;
import com.cozentus.CozentusTraining.model.Student;
import com.cozentus.CozentusTraining.model.Topic;
import com.cozentus.CozentusTraining.service.AssignmentService;
import com.cozentus.CozentusTraining.service.BatchProgramService;
import com.cozentus.CozentusTraining.service.BatchService;
import com.cozentus.CozentusTraining.service.CourseService;
import com.cozentus.CozentusTraining.service.ProgramService;
import com.cozentus.CozentusTraining.service.TopicService;

import jakarta.transaction.Transactional;


@CrossOrigin(origins="*", allowedHeaders = "*")
@Transactional
@RestController
@RequestMapping("/assignment")
//@PreAuthorize("hasAuthority('ROLE_TEACHER')")
public class AssignmentRestController {

	@Autowired
	private AssignmentService assignmentService;
	
	@Autowired
	private CourseService courseService;
	
	@Autowired
	private TopicService topicService;

	@Autowired
	private BatchProgramService batchProgramService;
	
	@Autowired
	private ProgramService programService;
	
	@Autowired
	private BatchService batchService;
	
	@GetMapping("/all")
	public ResponseEntity<List<EvaluationName>> getAllAssignments() {
		return ResponseEntity.ok(assignmentService.getAllAssignments());
	}

	@PostMapping("/add")
	public ResponseEntity<EvaluationName> addAssignment(@RequestBody EvaluationName attendance) {
		return ResponseEntity.ok(assignmentService.addAssignment(attendance));
	}

	@PostMapping("/update/{evaluationId}")
	public ResponseEntity<EvaluationName> updateAssignment(@RequestBody EvaluationName attendance,
			@PathVariable("attendanceId") Integer attendanceId) {
		return ResponseEntity.ok(assignmentService.updateAssignment(attendance, attendanceId));

	}

	@DeleteMapping("/delete/{evaluationId}")
	public ResponseEntity<Void> deleteAssignmentById(@PathVariable("evaluationId") Integer evaluationId) {
		assignmentService.deleteAssignmentById(evaluationId);
		return ResponseEntity.ok().build();
	}

	@GetMapping("/{evaluationId}")
	public ResponseEntity<Optional<EvaluationName>> getAssignmentById(@PathVariable("evaluationId") Integer evaluationId) {
		return ResponseEntity.ok(assignmentService.getAssignmentById(evaluationId));
	}
	
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
		return ResponseEntity.ok(topicService.getTopicsByCourseId(courseId));
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
	
	@GetMapping("/student/{batchId}/{programId}")
	public ResponseEntity<List<Student>> getStudentsByBatchIdAndProgramId(@PathVariable("batchId") Integer batchId,
			@PathVariable("programId") Integer programId) {
		return ResponseEntity.ok(batchService.getStudentsByBatchIdAndProgramId(batchId, programId));

	}

}

