package com.cozentus.CozentusTraining.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.cozentus.CozentusTraining.model.Credential;





public interface CredentialRepository extends JpaRepository<Credential, Integer>{
	Optional<Credential> findByUserId(String userId);
	
	@Query("SELECT role FROM Credential WHERE userId =:userId")
	String findUserRole(@Param("userId") String username);
}
