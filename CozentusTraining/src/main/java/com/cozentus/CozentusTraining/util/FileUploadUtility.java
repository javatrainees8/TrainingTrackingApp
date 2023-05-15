package com.cozentus.CozentusTraining.util;


import java.nio.file.Files;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;

import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

@Component
public class FileUploadUtility {
	public final String ABS_PATH = "C:\\Users\\mabhi\\Downloads\\CozentusProject new\\CozentusProject\\src\\main\\resources\\static\\";
	public FileUploadUtility() {}
	
	boolean fileUpload=false;
	public boolean uploadFile(MultipartFile file) {
		try {
			Files.copy(file.getInputStream(),Paths.get(ABS_PATH+file.getOriginalFilename()),StandardCopyOption.REPLACE_EXISTING);
			fileUpload = true;
		} catch (Exception e) {}
		return fileUpload;
	}
	
	
	
	
}
