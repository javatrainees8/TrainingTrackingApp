package com.cozentus.CozentusTraining.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.cozentus.CozentusTraining.model.Topic;
import com.cozentus.CozentusTraining.service.TopicService;
import com.cozentus.CozentusTraining.util.FileUploadUtility;

import jakarta.transaction.Transactional;


@CrossOrigin(origins="*",allowedHeaders = "*")
@Transactional
@RestController
@RequestMapping("/topic")
//@PreAuthorize("hasAuthority('ROLE_ADMIN')")
public class TopicRestController {
	@Autowired
	private TopicService topicService;
	@Autowired
	private FileUploadUtility fileUploadUtility;

	@GetMapping("/all")
	public List<Topic> getAllTopics() {
		return topicService.getAllTopics();
	}

	@PostMapping("/add")
	public Topic addTopic(@RequestBody Topic topic) {
		return topicService.addTopic(topic);
	}

	@PutMapping("/update/{topicId}")
	public Topic updateTopic(@RequestBody Topic topic, @PathVariable("topicId") Integer topicId) {
		return topicService.updateTopic(topic, topicId);
	}

	@DeleteMapping("/delete/{topicId}")
	public void deleteTopicById(@PathVariable("topicId") Integer topicId) {
		topicService.deleteTopicById(topicId);
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
}
