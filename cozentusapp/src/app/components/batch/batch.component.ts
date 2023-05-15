import { Component ,OnInit} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CommonService } from 'src/app/services/common.service';
import { DeleteConfrimationComponent } from 'src/app/shared/components/delete-confrimation/delete-confrimation.component';
import { forkJoin } from 'rxjs';
import { MatSelectChange } from '@angular/material/select';


@Component({
  selector: 'app-batch',
  templateUrl: './batch.component.html',
  styleUrls: ['./batch.component.scss'],
})
export class BatchComponent implements OnInit {
  batchAdded:any=[];
  selectedStudents:any[]=[];
  Students:any[]=[
    
  ];
  updateProgramId:any[]=[];

  batch: any[] =[];
  program: any[]=[];
  course: any[]=[];
  student:any[]=[];
  Teacher:any[]=[];
  Batch: any[] =[];
  Program: any[]=[];
  Course: any[]=[];
  Student:any[]=[];
  teacher:any[]=[];
  selectprogram:any
  start = 0;
  end = 5;
  addBatch() {
    this.batch.push({
      action: 'existingRecord',
      batchCode: '',
      batchName: '',
      batchId:'',
      isEditable: true,
      isExpanded: true,
      batchStartdate:new Date(),
      program:[],
      course:[]
    });
  }
  addProgram(index: number) {
    this.batch[index].program.push({
      action: 'existingRecord',
      programCode: '',
      programName: '',
      student: '',
      course:[],
      isEditable:true,
      isExpanded: true
    });
    
  }
  addCourse(index:number,programindex:number) {
    this.batch[index].course.push({
      action: 'existingRecord',
      courseCode: '',
      courseName: '',
      teacher: '',
      isEditable:true,
      isExpanded: true
    });
    console.log(this.course)
  }
  constructor(private dialog: MatDialog,private commonService:CommonService) {}
  ngOnInit(): void{
 {
    const program$ = this.commonService.getList('/batch/program/all');
   // const course$ = this.commonService.getList('/batch/course/show/all');
    const student$=this.commonService.getList('/batch/student/all')
   const batch$=this.commonService.getList('/batch/all')
   const Teacher$=this.commonService.getList('/batch/teacher/all')
  // const Batch$=this.commonService.getProgramsByBatchId('/get/programs',1)
      
    forkJoin([ program$,student$,batch$,Teacher$]).subscribe(([ programs,students,batchs,teachers]) => {
      console.log(programs);
      console.log(batchs)
      this.Program = programs
      this.Student=students;
      this.Teacher=teachers;
      this.Batch=batchs
      console.log(this.Batch)
      console.log(this.Program);
      console.log(this.Batch)
      
      for (const batchObj of this.batch) {
        const programsForBatch = this.program.filter((programObj) => programObj.Id === batchObj.program_id);
        batchObj.program = programsForBatch;
        for (let programIndex = 0; programIndex < batchObj.program.length; programIndex++) {
          const programObj = batchObj.program[programIndex];
          const coursesForProgram = this.course.filter((courseObj) => courseObj.courseCode
          === programObj.programCode);
          if (coursesForProgram) {
            programObj.course = coursesForProgram;
          }
        }
      }
    }
  );
}
  }
selectedProgram = this.program[0];

onProgramSelected(ele: any) {
  
    const batchID=this.batchAdded.batchId; //fetch the added batchId
    console.log(batchID);
  
  const program =this.Program.find(p => p.programCode === ele.programCode);;
  const programID = program.programId;
  console.log(programID);
  
  this.updateProgramId.push(batchID,programID);
  console.log(this.updateProgramId);

  
  this.commonService.getCoursesByProgram('/batch/course',programID).subscribe((data)=>{
    this.Course=data;
    console.log(this.Course);

  });

  this.commonService.updateProgramIdOfBatch(`/batch/update-program-id`,this.updateProgramId).subscribe((data: any) => {
    
  });
  
 
}
  getSelectedStudents(event:MatSelectChange){
    this.selectedStudents=event.value;
    console.log(this.selectedStudents);
    const requestBody = {
      updateProgramId: this.updateProgramId,
      students: this.selectedStudents
    };
    //  this.students.push(updateProgramId:this.updateProgramId);
    this.Students.push(requestBody);
    console.log(this.Students);

   
    this.Students.push(this.selectedStudents);
    
    console.log(this.Students);
    this.commonService.updatestudentAccordingtoBatchidProgramId('/batch/update-students/by-batch-program-id',requestBody).subscribe((data:any)=>{

    })
  }

onCourseSelected(ele: any) {
  const selectedCourse = this.course.find((course) => course.courseCode === ele.courseName);
  if (selectedCourse) {
    ele.courseCode = selectedCourse.courseCode;
  }
  const program =this.Program.find(p => p.programCode === ele.programCode);;
  if (program) {
    ele.programName = program.programName;
  }
  const batchProgramStudents = this.Student.map((student) => {
    const { batchId, programId } = student;
    const batch = this.Batch.find((batch) => batch.batchId === batchId);
    console.log(batch)
    const program = this.Program.find((program) => program.programId === programId);
    console.log(program)
    return {
      studentId: student.studentId,
      name: student.name,
      batchId: batch.batchId,
      programId: program.programId,
    };
  });
  console.log(batchProgramStudents);
  this.commonService.updatestudentAccordingtoBatchidProgramId('/batch/update/students/by-batch-program-id', batchProgramStudents).subscribe(programs => {
    // code to handle the response
  });
}
     
  disbaleEdit(index: number, value = false) {
    this.batch[index].isEditable = value;
    if (this.batch[index].id) {
      this.commonService
        .updateData(
          this.batch[index].id,
          '/batch/update',
          this.batch[index]
        )
        .subscribe(
          (res) => {
            console.log(res);
          },
          (err) => {
            console.log(err);
          }
        );
    } else {
      this.commonService
  .addData('/batch/add', this.batch[index])
  .subscribe(
    (res) => {
      this.batchAdded=res;
      console.log(this.batchAdded);
    },
    (err) => {
      console.log(err);
    }
  );
      
    }
  }
  deleteBatch(index: number) {
    const dialogRef = this.dialog.open(DeleteConfrimationComponent, {
      data: {
        title: 'Delete Batch',
        message: 'Are you sure that you want to delete batch?',
      },
    });

    dialogRef.afterClosed().subscribe((res) => {
      if (res) {
        this.batch.splice(index, 1);
       this.commonService
        .deleteData(this.batch[index].batchId,'/batch/delete')
        .subscribe(
          (res) => {
            console.log(res);
          },
          (err) => {
            console.log(err);
          }
        );
      }
    });
  }
  disableEditForProgram(index: number, programIndex: number, value = false) {
    this.batch[index].program[programIndex].isEditable = value;
   if (this.batch[index].program[programIndex].programId) {
    const batchId = this.batch[index].batchId;
    const programId = this.batch[index].program[programIndex].programId;
    const program = this.batch[index].program[programIndex]
}
}
  deleteProgram(index: number, programIndex: number) {
    this.batch[index].program.splice(programIndex, 1);
    const dialogRef = this.dialog.open(DeleteConfrimationComponent, {
      data: {
        title: 'Delete Batch',
        message: 'Are you sure that you want to delete batch?',
      },
    });
  }
  exandRowi(index: number) {
    this.batch[index].isExpanded = !this.batch[index].isExpanded;
  }
  exandRow(index: number,programIndex:number) {
    this.batch[index].program[programIndex].isExpanded = !this.batch[index].isExpanded;
  }

  disableEditForCourse(index: number,programIndex:number,courseIndex:number, value = false) {
    this.batch[index].program[programIndex].courseIndex[courseIndex].isEditable = value;
  }

  deleteCourse(index: number, courseIndex: number) {
    this.batch[index].course.splice(courseIndex, 1);
  }
  page(event: any) {
    this.start = ( event.pageSize + event.pageIndex * event.pageSize)-15;
    this.end = event.pageSize + event.pageIndex * event.pageSize;
  }
}
