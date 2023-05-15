package com.cozentus.CozentusTraining.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.cozentus.CozentusTraining.dto.TopicCoursePercentageDTO;
import com.cozentus.CozentusTraining.model.Batch;
import com.cozentus.CozentusTraining.model.Course;
import com.cozentus.CozentusTraining.model.Program;
import com.cozentus.CozentusTraining.model.Student;
import com.cozentus.CozentusTraining.model.Topic;
import com.cozentus.CozentusTraining.service.BatchProgramService;
import com.cozentus.CozentusTraining.service.BatchService;
import com.cozentus.CozentusTraining.service.CourseService;
import com.cozentus.CozentusTraining.service.ProgramService;
import com.cozentus.CozentusTraining.service.TopicService;

import jakarta.transaction.Transactional;


@CrossOrigin(origins="*", allowedHeaders = "*")
@Transactional
@RestController
@RequestMapping("/batch-program")
//@PreAuthorize("hasAuthority('ROLE_TEACHER')")
public class BatchProgramRestController {
	
	@Autowired
	private BatchProgramService batchProgramService;

	@Autowired
	private BatchService batchService;

	@Autowired
	private CourseService courseService;

	@Autowired
	private ProgramService programService;
	
	@Autowired
	private TopicService topicService;

	@GetMapping("/batch/all")
	public ResponseEntity<List<Batch>> getAllBatches() {
		return ResponseEntity.ok(batchService.getAllBatches());
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
	
	@GetMapping("/course-percentage")
	public ResponseEntity<List<TopicCoursePercentageDTO>> getAllCoursesAndTopics() {
		List<Course> courses = courseService.getCourses();
		List<TopicCoursePercentageDTO> tcps = new ArrayList<>();
		
		for(Course course : courses) {
			Double courseCompletion = topicService.getCourseCompletion(course.getCourseId());
			List<Topic> completedTopics = topicService.getCompletedTopics(course.getCourseId());
			List<Topic> inProgressTopics = topicService.getInCompletedTopics(course.getCourseId());
			
			TopicCoursePercentageDTO tcp = new TopicCoursePercentageDTO();
			
			tcp.setCourseId(course.getCourseId());
			tcp.setCourseCode(course.getCourseCode());
			tcp.setCourseName(course.getCourseName());
			tcp.setCourseDescription(course.getCourseDescription());
			tcp.setCreatedBy(course.getCreatedBy());
			tcp.setCreatedDate(course.getCreatedDate());
			tcp.setPracticeTime(course.getPracticeTime());
			tcp.setTheoryTime(course.getTheoryTime());
			tcp.setUpdatedBy(course.getUpdatedBy());
			tcp.setUpdatedDate(course.getUpdatedDate());
			tcp.setProgramId(course.getProgramId());
			tcp.setCourseCompletion(courseCompletion);
			tcp.setCompletedTopics(completedTopics);
			tcp.setInProgressTopics(inProgressTopics);
			
			tcps.add(tcp);
		}
		
		return ResponseEntity.ok(tcps);
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


//	@GetMapping("/student/{batchId}/{programId}")
//	public ResponseEntity<List<Student>> getStudentsByBatchIdAndProgramId(@PathVariable("batchId") Integer batchId,
//			@PathVariable("programId") Integer programId) {
//		return ResponseEntity.ok(batchService.getStudentsByBatchIdAndProgramId(batchId, programId));
//
//	}

}
