package com.cozentus.CozentusTraining.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cozentus.CozentusTraining.model.Topic;
import com.cozentus.CozentusTraining.repository.TopicRepository;

@Service
public class TopicService {
	@Autowired
	private TopicRepository topicRepository;

	public List<Topic> getAllTopics() {
		return topicRepository.findAll();
	}

	public Topic addTopic(Topic topic) {
		return topicRepository.save(topic);
	}

	public Topic updateTopic(Topic topic, Integer topicId) {
		topic.setTopicId(topicId);
		return topicRepository.save(topic);
	}

	public void deleteTopicById(Integer topicId) {
		topicRepository.deleteById(topicId);
	}

	public Optional<Topic> getTopicById(Integer topicId) {
		return topicRepository.findById(topicId);
	}

	public List<Topic> getTopicsByCourseId(Integer courseId) {
		return topicRepository.findByCourseId(courseId);
	}

	public void updateTopicPercentageCompleted(Integer topicPercentage, Integer topicId) {
		topicRepository.updateTopicPercentageCompleted(topicPercentage, topicId);
	}

	public Double getCourseCompletion(Integer courseId) {
		List<Topic> topics = topicRepository.findByCourseId(courseId);
		Double percent = 0.0;
		for(Topic topic: topics) {
			percent = percent + topic.getTopicPercentageCompleted();
		}
		
		Double courseCompletion = percent / topics.size();
		
		return courseCompletion;
	}
	
	public List<Topic> getCompletedTopics(Integer courseId) {
		return topicRepository.findByCourseIdAndCompletedTopics(courseId, 100);
	}
	
	public List<Topic> getInCompletedTopics(Integer courseId) {
		return topicRepository.findByCourseIdAndCompletedTopics(courseId, 100);
	}
}
