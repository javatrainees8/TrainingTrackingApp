package com.cozentus.CozentusTraining.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.cozentus.CozentusTraining.model.Credential;
import com.cozentus.CozentusTraining.model.EmailMessage;
import com.cozentus.CozentusTraining.model.Teacher;
import com.cozentus.CozentusTraining.repository.CredentialRepository;



@Service
public class CredentialService {
	@Autowired
	private CredentialRepository credentialRepository;

	@Autowired
	private EmailService emailService;

	@Autowired
	private PasswordEncoder passwordEncoder;
	
	public String getRole(String username) {
    	return credentialRepository.findUserRole(username);
    }

	public void addTeacherCredential(Teacher teacher) {

		Credential credential = new Credential();

		credential.setUserId(teacher.getTeacherEmail());
		credential.setPassword(getBCryptPassword(teacher.getTeacherName()));
		credential.setRole("ROLE_TEACHER");
		credential.setUpdatedDate(teacher.getUpdatedDate());
		credential.setUpdatedBy(teacher.getUpdatedBy());
		credential.setCreatedDate(teacher.getCreatedDate());
		credential.setCreatedBy(teacher.getCreatedBy());

		credentialRepository.save(credential);

		generateEmail(teacher);
	}

	public void generateEmail(Teacher teacher) {
		EmailMessage email = new EmailMessage();
		email.setTo(teacher.getTeacherEmail());

		email.setSubject("Your Teacher Credential.");
		email.setMessage("You have been added as Teacher." + "\nYour credential is:" + "\nUsername: " + email.getTo()
				+ "\nPassword: " + createPassword(teacher.getTeacherName()));

		emailService.sendEmail(email);
	}

	public String getBCryptPassword(String name) {

		String password = createPassword(name);

		String bCryptPassword = passwordEncoder.encode(password);
		return bCryptPassword;
	}

	public String createPassword(String name) {
		String password;
		String names[] = name.split(" ");
		if (names.length >= 2) {
			password = names[1].substring(0, 1) + names[0] + "@123";
		} else {
			password = name + "@123";
		}

		return password;
	}
}
