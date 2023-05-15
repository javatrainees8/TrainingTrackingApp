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
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.cozentus.CozentusTraining.model.Batch;
import com.cozentus.CozentusTraining.model.Course;
import com.cozentus.CozentusTraining.model.EvaluationName;
import com.cozentus.CozentusTraining.model.Program;
import com.cozentus.CozentusTraining.model.Student;
import com.cozentus.CozentusTraining.model.Topic;
import com.cozentus.CozentusTraining.service.BatchProgramService;
import com.cozentus.CozentusTraining.service.BatchService;
import com.cozentus.CozentusTraining.service.CourseService;
import com.cozentus.CozentusTraining.service.ExamService;
import com.cozentus.CozentusTraining.service.ProgramService;
import com.cozentus.CozentusTraining.service.TopicService;
import com.cozentus.CozentusTraining.util.FileUploadUtility;

import jakarta.transaction.Transactional;


@CrossOrigin(origins="*", allowedHeaders = "*")
@Transactional
@RestController
@RequestMapping("/exam")
//@PreAuthorize("hasAuthority('ROLE_TEACHER')")
public class ExamRestController {

	@Autowired
	private ExamService examService;

	@Autowired
	private CourseService courseService;

	@Autowired
	private TopicService topicService;
	
	@Autowired
	private FileUploadUtility fileUploadUtility;
	
	@Autowired
	private BatchProgramService batchProgramService;
	
	@Autowired
	private ProgramService programService;
	

	@Autowired
	private BatchService batchService;

	@GetMapping("/all")
	public ResponseEntity<List<EvaluationName>> getAllExams() {
		return ResponseEntity.ok(examService.getAllExams());
	}

	@PostMapping("/add")
	public ResponseEntity<EvaluationName> addExam(@RequestBody EvaluationName attendance) {
		return ResponseEntity.ok(examService.addExam(attendance));
	}

	@PostMapping("/update/{evaluationId}")
	public ResponseEntity<EvaluationName> updateExmam(@RequestBody EvaluationName attendance,
			@PathVariable("attendanceId") Integer attendanceId) {
		return ResponseEntity.ok(examService.updateExam(attendance, attendanceId));

	}

	@DeleteMapping("/delete/{evaluationId}")
	public ResponseEntity<Void> deleteExamById(@PathVariable("evaluationId") Integer evaluationId) {
		Optional<EvaluationName> exam = examService.getExamById(evaluationId);
		if (exam.isPresent()) {
			examService.deleteExamById(evaluationId);
			return ResponseEntity.ok().build();
		} else {

			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
		}
	}

	@GetMapping("/{evaluationId}")
	public ResponseEntity<Optional<EvaluationName>> getExamById(@PathVariable("evaluationId") Integer evaluationId) {
		return ResponseEntity.ok(examService.getExamById(evaluationId));
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
	
	
	@PostMapping("/add-marks")
	public ResponseEntity<Void> addMarks(@RequestBody List<EvaluationName> marks) {
		for(EvaluationName exam : marks) {
			examService.addExam(exam);
		}
		return ResponseEntity.ok().build();
	}
	
	@PostMapping("/upload")
	public ResponseEntity<String> fileUpload(@RequestParam("file") MultipartFile file) {
		System.out.println(file.getContentType());
		System.out.println(file.getName());
		System.out.println(file.getOriginalFilename());
		if (file.isEmpty()) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Please select a proper format");
		}
		if (fileUploadUtility.uploadFile(file)) {
			return ResponseEntity.ok(ServletUriComponentsBuilder.fromCurrentContextPath().path("/uploads/")
					.path(file.getOriginalFilename()).toUriString());
		}
		return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
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

