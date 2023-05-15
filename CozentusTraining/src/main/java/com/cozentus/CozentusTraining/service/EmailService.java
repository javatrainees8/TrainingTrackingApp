package com.cozentus.CozentusTraining.service;


import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import com.cozentus.CozentusTraining.model.EmailMessage;





@Service
public class EmailService {
	private final JavaMailSender mailSender;

	@Value("${spring.mail.username}")
	private String from;

	public EmailService(JavaMailSender mailSender) {
		this.mailSender = mailSender;
	}

	public void sendEmail(EmailMessage email) {
		SimpleMailMessage simpleMailMessage = new SimpleMailMessage();
		
		simpleMailMessage.setFrom(from);
		simpleMailMessage.setTo(email.getTo());
		simpleMailMessage.setSubject(email.getSubject());
		simpleMailMessage.setText(email.getMessage());
		
		this.mailSender.send(simpleMailMessage);
	}
}
