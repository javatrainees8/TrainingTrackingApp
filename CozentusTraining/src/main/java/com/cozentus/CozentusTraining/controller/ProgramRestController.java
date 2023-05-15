package com.cozentus.CozentusTraining.controller;

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

import com.cozentus.CozentusTraining.dto.ProgramCourseDTO;
import com.cozentus.CozentusTraining.model.Course;
import com.cozentus.CozentusTraining.model.Program;
import com.cozentus.CozentusTraining.service.CourseService;
import com.cozentus.CozentusTraining.service.ProgramService;

import jakarta.transaction.Transactional;


@CrossOrigin(origins="*", allowedHeaders = "*")
@RestController
@RequestMapping("/program")
public class ProgramRestController {
		
		@Autowired
		private ProgramService programService;
		
		@Autowired
		private CourseService courseService;

		
		@GetMapping("/all")
		public ResponseEntity<List<Program>> getAllPrograms(){
			return ResponseEntity.ok(programService.getPrograms());
		}
		
		@PostMapping("/update/{programId}")
		public ResponseEntity<Program> updateProgram( @RequestBody Program program ,@PathVariable("programId") Integer programId) {
			return ResponseEntity.ok(programService.updateProgram(program, programId));
		}
		
		
		
		@DeleteMapping("/delete/{programId}")
		public ResponseEntity<Void> deleteById(@PathVariable("programId") Integer programId) {
			Optional<Program> check = programService.getProgramById(programId);
			if(check.isPresent()) {
				programService.deleteById(programId);
				return ResponseEntity.ok().build();
			}else {
				return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
			}
		}
		
		
		@Transactional
		@PostMapping("/add")
		public ResponseEntity<Void> addProgram(@RequestBody ProgramCourseDTO programCourseDto) {
			Program program = new Program();
			
			program.setProgramCode(programCourseDto.getProgramCode());
			
			program.setProgramCode(programCourseDto.getProgramCode());
			program.setProgramName(programCourseDto.getProgramName());
			program.setProgramDescription(programCourseDto.getProgramDescription());
			program.setTheoryTime(programCourseDto.getTheoryTime());
			program.setPracticeTime(programCourseDto.getPracticeTime());
			program.setCreatedBy(programCourseDto.getCreatedBy());
			program.setCreatedDate(programCourseDto.getCreatedDate());
			program.setUpdatedBy(programCourseDto.getUpdatedBy());
			program.setUpdatedDate(programCourseDto.getUpdatedDate());	
			
			List<Course> selectedCourses = programCourseDto.getSelectedCourses();
			programService.addProgram(program);
			courseService.updateProgramIdOfCourses(selectedCourses, program.getProgramId());
			return ResponseEntity.ok().build();
		}
		

		@GetMapping("/all-courses")
		public ResponseEntity<List<Course>> getAllCourses() {
			return ResponseEntity.ok(courseService.getCourses());
		}

}
