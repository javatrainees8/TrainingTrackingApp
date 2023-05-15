package com.cozentus.CozentusTraining.dto;



import java.util.List;

import com.cozentus.CozentusTraining.model.Student;

public class BatchProgramStudentDTO {
	List<Integer> updateProgramId;
	List<Student> students;
	
	public BatchProgramStudentDTO(List<Integer> updateProgramId, List<Student> students) {
		this.updateProgramId = updateProgramId;
		this.students = students;
	}
	public BatchProgramStudentDTO() {
	}
	public List<Integer> getUpdateProgramId() {
		return updateProgramId;
	}
	public void setupdateProgramId(List<Integer> updateProgramId) {
		this.updateProgramId = updateProgramId;
	}
	public List<Student> getStudents() {
		return students;
	}
	public void setStudents(List<Student> students) {
		this.students = students;
	}
	@Override
	public String toString() {
		return "BatchProgramStudentDTO [updateProgramId=" + updateProgramId + ", students=" + students + "]";
	}
	

	

}
