package com.cozentus.CozentusTraining.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.cozentus.CozentusTraining.model.Topic;

public interface TopicRepository extends JpaRepository<Topic, Integer> {

	List<Topic> findByCourseId(int courseId);

	@Modifying
	@Query("UPDATE Topic SET topicPercentageCompleted=:topicPercentageCompleted where courseId=:courseId")
	void updateTopicPercentageCompleted(@Param("topicPercentageCompleted") Integer topicPercentageCompleted,
			@Param("courseId") Integer courseId);
	
	
	@Query("FROM Topic where courseId=:courseId AND topicPercentageCompleted=:number")
	List<Topic> findByCourseIdAndCompletedTopics(@Param("courseId") Integer courseId, @Param("number") Integer number);

	@Query("FROM Topic where courseId=:courseId AND topicPercentageCompleted!=:number")
	List<Topic> findByCourseIdAndInprogressTopics(@Param("courseId") Integer courseId, @Param("number") Integer number);

}
