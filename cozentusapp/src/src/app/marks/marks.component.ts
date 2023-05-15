import { Component ,OnInit} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { forkJoin } from 'rxjs';
import { CommonService } from 'src/app/services/common.service';
import { DeleteConfrimationComponent } from 'src/app/shared/components/delete-confrimation/delete-confrimation.component';

@Component({
  selector: 'app-marks',
  templateUrl: './marks.component.html',
  styleUrls: ['./marks.component.scss']
})



export class MarksComponent implements OnInit {
  batch: any[] = [];
  program:any[]=[];
  course:any[]=[];
  start = 0;
  end = 5;
  batchCode: any;
  batchId:any;
  addBatch() {
    this.batch.push({
      action: '',
      batchId:'',
      code: '',
      name: '',
      isEditable: true,
      isExpanded: true,
      startDate: new Date(),
      program: [],
      topics: [],
      course: [],
    });
  }
  constructor(private dialog: MatDialog,private commonService:CommonService) {}

  ngOnInit(): void {
    const batch$ = this.commonService.getList('/batch/all');
    const program$ = this.commonService.getList('/batch/all-programs');
    const course$ = this.commonService.getList('/batch/all-courses');
  
    forkJoin([batch$, program$, course$]).subscribe(([batch, programs, courses]) => {
      console.log(batch);
      console.log(programs);
      console.log(courses);
      this.batch = batch;
      this.program = programs;
      this.course = courses;
      
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
onInputChange(){
  console.log('Input value changed:', this.batchCode);
  this.commonService.getProgramsByBatch("/attendance/programs",14).subscribe((response: any) => {
    this.program = response;
    console.log(this.program);
    });
}

disbaleEdit(index: number, value = false) {
    this.batch[index].isEditable = value;
    if (this.batch[index].id) {
      this.commonService
        .addData('batch/add', this.batch[index])
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
        .updateData(
          this.batch[index].id,
          'batch/update',
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
        .deleteData('/batch/delete', this.batch[index].batchId)
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
  }

  deleteProgram(index: number, programIndex: number) {
    this.batch[index].program.splice(programIndex, 1);
  }

  exandRow(index: number) {
    this.batch[index].isExpanded = !this.batch[index].isExpanded;
  }

  disableEditForCourse(index: number, courseIndex: number, value = false) {
    this.batch[index].course[courseIndex].isEditable = value;
  }

  deleteCourse(index: number, courseIndex: number) {
    this.batch[index].course.splice(courseIndex, 1);
  }
  page(event: any) {
    this.start = ( event.pageSize + event.pageIndex * event.pageSize)-5;
    this.end = event.pageSize + event.pageIndex * event.pageSize;
  }

  addProgram(index: number) {
    this.batch[index].program.push({
      code: '',
      name: '',
      student: '',
      isEditable: true,
    });
  }
  addCourse(index: number) {
    this.batch[index].course.push({
      code: '',
      name: '',
      teacher: '',
      isEditable: true,
    });
  }
}
