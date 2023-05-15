package com.cozentus.CozentusTraining.controller;

import java.util.ArrayList;
import java.util.Date;
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

import com.cozentus.CozentusTraining.dto.BatchProgramDTO;
import com.cozentus.CozentusTraining.dto.BatchProgramStudentDTO;
import com.cozentus.CozentusTraining.model.Batch;
import com.cozentus.CozentusTraining.model.BatchProgram;
import com.cozentus.CozentusTraining.model.Course;
import com.cozentus.CozentusTraining.model.Program;
import com.cozentus.CozentusTraining.model.Student;
import com.cozentus.CozentusTraining.model.Teacher;
import com.cozentus.CozentusTraining.service.BatchProgramService;
import com.cozentus.CozentusTraining.service.BatchService;
import com.cozentus.CozentusTraining.service.CourseService;
import com.cozentus.CozentusTraining.service.ProgramService;
import com.cozentus.CozentusTraining.service.StudentService;
import com.cozentus.CozentusTraining.service.TeacherCourseService;
import com.cozentus.CozentusTraining.service.TeacherService;

import jakarta.transaction.Transactional;


@CrossOrigin(origins="*", allowedHeaders = "*")
@Transactional
@RestController
@RequestMapping("/batch")
//@PreAuthorize("hasAuthority('ROLE_ADMIN')")
public class BatchRestController {
	@Autowired
	private BatchService batchService;

	@Autowired
	private BatchProgramService batchProgramService;

	@Autowired
	private CourseService courseService;

	@Autowired
	private ProgramService programService;

	@Autowired
	private TeacherService teacherService;

	@Autowired
	private StudentService studentService;

	@Autowired
	TeacherCourseService teacherCourseService;
	
	
	@PostMapping("/add")
	public ResponseEntity<Batch> addCourse(@RequestBody Batch batch) {
		return ResponseEntity.ok(batchService.addBatch(batch));
	}
//	
//	@PostMapping("/add")
//	public ResponseEntity<Void> addBatch(@RequestBody BatchProgramDTO batchProgram) {
//		Batch batch = new Batch();
//		batch.setBatchCode(batchProgram.getBatchCode());
//		batch.setBatchName(batchProgram.getBatchName());
//		batch.setBatchStartdate(batchProgram.getBatchStartdate());
//		batch.setCreatedDate(batchProgram.getCreatedDate());
//		batch.setCreatedBy(batchProgram.getCreatedBy());
//		batch.setUpdatedDate(batchProgram.getUpdatedDate());
//		batch.setUpdatedBy(batchProgram.getUpdatedBy());
//		
//		List<Program> programs = batchProgram.getPrograms();
//
//		batchService.addBatch(batch);
//		batchProgramService.addBatchProgram(batch, programs);
//
//		return ResponseEntity.ok().build();
//	}

	@GetMapping("/all")
	public ResponseEntity<List<BatchProgramDTO>> getAllBatches() {
		List<Batch> batches = batchService.getAllBatches();
		List<BatchProgramDTO> batchPrograms = new ArrayList<>();

		for (Batch batch : batches) {
			List<Program> programs = new ArrayList<>();

			Integer batchId = batch.getBatchId();
			String batchName=batch.getBatchName();
			String batchCode=batch.getBatchCode();
			Date batchStartdate=batch.getBatchStartdate();
			
			List<Integer> programIds = batchProgramService.getProgramsByBatchId(batchId);
			for (Integer programId : programIds) {
				Program program = programService.getProgramById(programId).get();
				programs.add(program);
			}
			batchPrograms.add(new BatchProgramDTO(batchId,batchName, batchCode,batchStartdate,programs));
		}
		return ResponseEntity.ok(batchPrograms);
	}


	@PostMapping("/update/{batchId}")
	public ResponseEntity<Batch> updateBatch(@RequestBody Batch batch, @PathVariable("batchId") Integer batchId) {
		Batch updated_batch = batchService.updateBatch(batch, batchId);
		return ResponseEntity.ok(updated_batch);
	}

	@DeleteMapping("/delete/{batchId}")
	public ResponseEntity<Void> deleteBatchById(@PathVariable("batchId") Integer batchId) {
		batchService.deleteBatchById(batchId);
		return ResponseEntity.ok().build();
	}

	

	@GetMapping("/student/all")
	public ResponseEntity<List<Student>> getAllStudents() {
		return ResponseEntity.ok(studentService.getStudents());
	}

	@GetMapping("/program/all")
	public ResponseEntity<List<Program>> getAllPrograms() {
		return ResponseEntity.ok(programService.getPrograms());
	}

	@GetMapping("/course/all")
	public ResponseEntity<List<Course>> getAllCourses() {
		return ResponseEntity.ok(courseService.getCourses());
	}

	@GetMapping("/teacher/all")
	public ResponseEntity<List<Teacher>> getAllTeachers() {
		return ResponseEntity.ok(teacherService.getTeachers());
	}


//	@Transactional
//	@PostMapping("/update-batchId-student/{batchId}/{programId}")
//	public ResponseEntity<Void> updateBatchIdOfStudent(@RequestBody List<Integer> studentsId,
//			@PathVariable("batchId") Integer batchId, @PathVariable("programId") Integer programId) {
//		studentService.updateBatchIdOfStudents(studentsId, batchId, programId);
//		return ResponseEntity.ok().build();
//	}

	@GetMapping("/student/{batchId}/{programId}")
	public ResponseEntity<List<Student>> getStudentsByBatchIdAndProgramId(@PathVariable("batchId") Integer batchId,
			@PathVariable("programId") Integer programId) {
		return ResponseEntity.ok(batchService.getStudentsByBatchIdAndProgramId(batchId, programId));

	}
	
	@GetMapping("/course/{programId}")
	public ResponseEntity<List<Course>> getCoursesByProgramId(@PathVariable("programId") Integer programId) {
		return ResponseEntity.ok(courseService.getcourseByProgramId(programId));
	}
	

		// Added......

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
	public ResponseEntity<List<Course>> getAllCoursesByProgramId(@PathVariable("programId") Integer programId) {
		return ResponseEntity.ok(courseService.getcourseByProgramId(programId));
	}

	@GetMapping("/students/{programId}")
	public ResponseEntity<List<Student>> getAllStudentsByProgramId(@PathVariable("programId") Integer programId) {
		return ResponseEntity.ok(studentService.findstudentsByProgramId(programId));
	}

	@GetMapping("/teachers/{courseId}")
	public ResponseEntity<List<Teacher>> getAllTeachersByCourseId(@PathVariable("courseId") Integer courseId) {
		List<Teacher> teachers = new ArrayList<>();
		List<Integer> teacherIds = teacherCourseService.getTeacherIdsByCourseId(courseId);

		for (Integer teacherId : teacherIds) {
			Teacher teacher = teacherService.getTeacherById(teacherId).get();
			teachers.add(teacher);
		}
		return ResponseEntity.ok(teachers);
	}


	@PostMapping("/update-program-id")
	public ResponseEntity<BatchProgram> updateProgramIdByBatchId(@RequestBody List<Integer> updateProgramId) {
		BatchProgram batchProgram = new BatchProgram();
		batchProgram.setBatchId(updateProgramId.get(0));
		batchProgram.setProgramId(updateProgramId.get(1));
		
		return ResponseEntity.ok(batchProgramService.addBatchProgramId(batchProgram));
	}
	

	@PostMapping("/update-students/by-batch-program-id")
	public ResponseEntity<Void> updateBatchIdAndProgramIdOfStudent(@RequestBody BatchProgramStudentDTO batchProgramStudent) {
		System.out.println(batchProgramStudent);
		List<Student> students = batchProgramStudent.getStudents();
		for(Student student : students) {
			studentService.updateBatchIdAndProgramIdOfStudents(student.getStudentId(), batchProgramStudent.getUpdateProgramId().get(0), batchProgramStudent.getUpdateProgramId().get(1));
		}
		return ResponseEntity.ok().build();
	}
}
