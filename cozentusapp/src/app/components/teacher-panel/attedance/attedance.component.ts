import { Component, ViewChild } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  FormArray,
  AbstractControl,
} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSelectChange } from '@angular/material/select';
import { MatTableDataSource } from '@angular/material/table';
import { CommonService } from 'src/app/services/common.service';
import { CommonDialogComponent } from 'src/app/shared/components/common-dialog/common-dialog.component';
import { DeleteConfrimationComponent } from 'src/app/shared/components/delete-confrimation/delete-confrimation.component';
import { FileUploadComponent } from 'src/app/shared/components/file-upload/file-upload.component';

let ELEMENT_DATA: any[] = [];

export interface AttendanceData {
  studentId: number;
  batchId: number;
  programId: number;
  date: string;
  attendance: boolean;
}
@Component({
  selector: 'app-attedance',
  templateUrl: './attedance.component.html',
  styleUrls: ['./attedance.component.scss'],
})
export class AttedanceComponent {
  value: any;
  fieldValue1 = '';
  fieldValue2:string = '';
  fieldValue3:string = '';
  batchNameAndCode:any;
  batchStartdate:Date | undefined;
  ProgramNameAndCode:any;
  courseNameAndCourseCode:any;

  topicName:any='';
  
  getBatchStartDate(batchNameAndCode:string): Date{
    const selectedBatch = this.batches.find(batches=>`${batches.batchCode}-${batches.batchName}`===batchNameAndCode);
    return selectedBatch?.batchStartdate;
   
  }
  startDate: any = new Date();
  displayedColumns: string[] = ['action', 'name', 'topicPercentageCompleted'];
  batches:any[]=[];
  programs:any[]=[];
  courses:any[]=[];
  topics:any[]=[];
  students:any[]=[];
  AttendanceData: AttendanceData[] = [];
  dataSource = new MatTableDataSource<any>();
  successMessage: string | undefined
  allSelected=false;

  isLoading = true;
  buttonDisable=false;
  pageNumber: number = 1;
  VOForm!: FormGroup;
  isEditableNew: boolean = true;


  topicsId:any;
  
 batchID:any; 
  constructor(
    private fb: FormBuilder,
    private commonService:CommonService,
    private _formBuilder: FormBuilder,
    private dialog: MatDialog,

    
    
  ) {}
  addCourse(){
    this.courses.push({
      topic:[]
    })
  }
    addTopic(){
      this.topics.push({
        action:"existingRecord",
        topicName:'',
        topicPercentageCompleted:Number,
        isEditable:true,
      })
    }
  ngOnInit(): void {

    
    this.VOForm = this._formBuilder.group({
      VORows: this._formBuilder.array([]),
    });
    this.commonService.getList('/attendance/batch/all').subscribe((data:any)=>{
      this.batches=data;
      console.log(this.batches);
    })
    this.commonService.getList('/attendance/program/all').subscribe((data:any)=>{
      this.programs=data;
      console.log(this.programs);
    })
    
    this.commonService.getList('/attendance/course/all').subscribe((data:any)=>{
      this.courses=data;
      console.log(this.courses);
    })


    
    this.commonService.getList('attendance/all-attendances').subscribe(
      (res) => {
        console.log(res);
        ELEMENT_DATA=res.data
      },
      (err) => {
        console.log(err);
      }
    );
    this.VOForm = this.fb.group({
      VORows: this.fb.array(
        ELEMENT_DATA.map((val) =>
          this.fb.group({
            action: new FormControl('existingRecord'),
            topicName: new FormControl(val.topicName),
            topicPercentageCompleted: new FormControl(
              val.topicPercentageCompleted.value
            ),
            topicId:new FormControl(val.topicId),
            isEditable: new FormControl(true),

            isNewRow: new FormControl(false),
          })
        )
      ), //end of fb array
    }); // end of form group cretation
    this.isLoading = false;
    this.dataSource = new MatTableDataSource(
      (this.VOForm.get('VORows') as FormArray).controls
    );
    this.dataSource.paginator = this.paginator;

    const filterPredicate = this.dataSource.filterPredicate;
    this.dataSource.filterPredicate = (data: AbstractControl, filter) => {
      return filterPredicate.call(this.dataSource, data.value, filter);
    };


  }
  onBatchSelected(): void {
    console.log('batchNameAndCode:', this.batchNameAndCode);
     // Debugging statement
      this.batchID= this.batchNameAndCode.batchId;
     console.log(this.batchID);
    if (!this.batchNameAndCode) {
      return; // if batchNameAndCode is not defined, exit the function
    }
  
    const selectedBatch = this.batchNameAndCode.split('-');
    console.log('selectedBatch:', selectedBatch); // Debugging statement
    const batchName = selectedBatch[2];
    const batchCode = selectedBatch[1];
    const batchId = selectedBatch[0]; // Extract the batchId from the selectedBatch array
  
    console.log('batchName:', batchName); // Debugging statement
    console.log('batchCode:', batchCode); // Debugging statement
    console.log('batchId:', batchId); // Debugging statement
  
    // Call your backend API to get the program ID based on the selected batch
    this.commonService.getProgramsByBatch("/attendance/programs", this.batchID).subscribe((response: any) => {
      this.programs = response;
      console.log(this.programs);
    });
  }
  
  onProgramSelected(){
    
    console.log('programNameandProgramCode:', this.ProgramNameAndCode);
    // Debugging statement
    const programID= this.ProgramNameAndCode.programId;
    console.log(programID);
this.commonService.getCoursesByProgram("/attendance/courses",programID).subscribe((response: any) => {
     
  this.courses = response;
  console.log(this.courses);
    });

this.commonService.getStudentByProgramIdandBatchId("/attendance/students",programID,this.batchID).subscribe((response: any) => {
  this.students = response;
  console.log(this.students);
    });

  }
  onCourseSelected(){
    console.log('courseNameAndcourseCode:', this.courseNameAndCourseCode);
    // Debugging statement
    const courseID= this.courseNameAndCourseCode.courseId;
    console.log(courseID);
    this.commonService.getTopicByCourseId("/attendance/topic",courseID).subscribe((response:any)=>{
      this.topics = response;
      console.log(this.topics);
    })

  }
  onTopicSelect(event: MatSelectChange,VOFormElement: any, i: any) {
    
    VOFormElement.get('VORows').at(i).get('isEditable').patchValue(true);
    const selectedTopicName = VOFormElement.get('VORows').at(i).value.topicName;
    console.log(selectedTopicName)
    const selectedTopic = this.topics.find(topic => topic.topicName === selectedTopicName);
    if (selectedTopic) {
      console.log('Selected Topic:', selectedTopic);
      this.topicsId=selectedTopic.topicId;
      console.log(this.topicsId);
    }
  
    else{
      console.error;
    }
  }

  saveAttendance() {
    const attendanceData: AttendanceData[] = [];
    const currentDate = new Date(); // Get the current date
  
    for (const student of this.students) {
      attendanceData.push({
        studentId: student.studentId,
       batchId: student.batchId,
        programId: student.programId,
         date: currentDate.toISOString(),
        attendance: student.attendance
      });
      console.log(attendanceData);
    }
    this.commonService.addData('/attendance/add-attendances',attendanceData).subscribe(
      () => {
        this.successMessage = 'Attendance saved successfully!';
      },
      error => console.error(error)
      );
    }
  selectAll() {
    for (const student of this.students) {
      student.attendance = this.allSelected;
    }
  }

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  goToPage() {
    this.paginator.pageIndex = this.pageNumber - 1;
    this.paginator.page.next({
      pageIndex: this.paginator.pageIndex,
      pageSize: this.paginator.pageSize,
      length: this.paginator.length,
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.paginatorList = document.getElementsByClassName(
      'mat-paginator-range-label'
    );

    this.onPaginateChange(this.paginator, this.paginatorList);

    this.paginator.page.subscribe(() => {
      // this is page change event
      this.onPaginateChange(this.paginator, this.paginatorList);
    });
  }

  uploadFile() {
    const dialogRef = this.dialog.open(FileUploadComponent, {
      width: '700px',
    });
    dialogRef.afterClosed().subscribe((res) => {
      console.log(res);
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    console.log(filterValue);

    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  // @ViewChild('table') table: MatTable<PeriodicElement>;
  AddNewRow() {
    const control = this.VOForm.get('VORows') as FormArray;
    control.insert(0, this.initiateVOForm());
    this.buttonDisable=true;
    this.dataSource = new MatTableDataSource(control.controls);
  }

  deleteRow(index: number, key = '') {
    const dialogRef = this.dialog.open(DeleteConfrimationComponent, {
      data: {
        title: `Delete Attendance`,
        message: 'Are you sure that you want to delete Attendance?',
      },
    });
    dialogRef.afterClosed().subscribe((res) => {
      const control = this.VOForm.get('VORows') as FormArray;
      control.controls.splice(index, 1);
      this.commonService
      .deleteData(control.controls[index].value.id, '/attendance/delete')
      .subscribe(
        (res) => {
          console.log(res);
        },
        (err) => {
          console.log(err);
        }
      );
      this.dataSource = new MatTableDataSource(control.controls);
    });
  }

  // this function will enabled the select field for editd
  EditSVO(VOFormElement: any, i: any) {
    VOFormElement.get('VORows').at(i).get('isEditable').patchValue(false);
  }

  editDescription(VOFormElement: any, i: any, key = '') {
    console.log(key);

    const dialogRef = this.dialog.open(CommonDialogComponent, {
      data: {
        title: key === 'description' ? 'Summary' : 'Content',
      },
      disableClose: true,
      width: '400px',
    });
    dialogRef.afterClosed().subscribe((res) => {
      if (res) {
        VOFormElement.get('VORows').at(i).get(key).patchValue(res);
      }
    });
  }
  

  // On click of correct button in table (after click on edit) this method will call
  SaveVO(VOFormElement: any, i: any) {
    VOFormElement.get('VORows').at(i).get('isEditable').patchValue(true);
    if (VOFormElement.get('VORows').at(i).value.id) {
      this.commonService
        .updateData(
          VOFormElement.get('VORows').at(i).value.id,
          '/attendance/update',
          VOFormElement.get('VORows').at(i).value
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
      .updateTopicPercentage("/attendance/update-topic",this.topicsId,VOFormElement.get('VORows').at(i).value.topicPercentageCompleted)
      .subscribe(
        (res) => {
          console.log(res);
        },
        (err) => {
          console.log(err);
        }
      );
        
    }
    this.buttonDisable=false
  }

  // On click of cancel button in the table (after click on edit) this method will call and reset the previous data
  CancelSVO(VOFormElement: any, i: any) {
    VOFormElement.get('VORows').at(i).get('isEditable').patchValue(true);
  }

  paginatorList!: HTMLCollectionOf<Element>;
  idx!: number;
  onPaginateChange(paginator: MatPaginator, list: HTMLCollectionOf<Element>) {
    setTimeout(
      (idx: any) => {
        let from = paginator.pageSize * paginator.pageIndex + 1;

        let to =
          paginator.length < paginator.pageSize * (paginator.pageIndex + 1)
            ? paginator.length
            : paginator.pageSize * (paginator.pageIndex + 1);

        let toFrom = paginator.length == 0 ? 0 : `${from} - ${to}`;
        let pageNumber =
          paginator.length == 0
            ? `0 of 0`
            : `${paginator.pageIndex + 1} of ${paginator.getNumberOfPages()}`;
        let rows = `Page ${pageNumber} (${toFrom} of ${paginator.length})`;

        if (list.length >= 1) list[0].innerHTML = rows;
      },
      0,
      paginator.pageIndex
    );
  }

  initiateVOForm(): FormGroup {
    return this.fb.group({
      action: new FormControl('existingRecord'),
      topicName: new FormControl(),
      topicPercentageCompleted: new FormControl(),
      isNewRow: new FormControl(false),
      topicId:new FormControl(),
      isEditable: new FormControl(false),
    });
  }
}
