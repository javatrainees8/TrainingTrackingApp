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
import { MatTableDataSource } from '@angular/material/table';
import { CommonService } from 'src/app/services/common.service';
import { CommonDialogComponent } from 'src/app/shared/components/common-dialog/common-dialog.component';
import { DeleteConfrimationComponent } from 'src/app/shared/components/delete-confrimation/delete-confrimation.component';
import { FileUploadComponent } from 'src/app/shared/components/file-upload/file-upload.component';

let ELEMENT_DATA: any[] = [];
@Component({
  selector: 'app-assigment',
  templateUrl: './assigment.component.html',
  styleUrls: ['./assigment.component.scss'],
})
export class AssigmentComponent {
  displayedColumns: string[] = [
    'action',
    'name',
    'code',
    'date',
    'time',
    'file',
  ];
  buttonDisable = false;
  studentList: any[] = [];
  showStudentList: boolean = false;
  dataSource = new MatTableDataSource<any>();
  value: any;
  fieldValue1 = '';
  startDate: any = new Date();
  isLoading = true;
  commonStudents: string[] = [];
  batches:any[]=[];
  programs:any[]=[];
  courses:any[]=[];
  students:any[]=[];
  topics:any[]=[];
  batchNameAndCode:any;
  batchStartdate:Date | undefined;
  ProgramNameAndCode:any;
  courseNameAndCourseCode:any;
  batchID:any;

  getBatchStartDate(batchNameAndCode:string): Date{
    const selectedBatch = this.batches.find(batches=>`${batches.batchCode}-${batches.batchName}`===batchNameAndCode);
    return selectedBatch?.batchStartdate;
  }
  pageNumber: number = 1;
  VOForm!: FormGroup;
  isEditableNew: boolean = true;
  constructor(
    private commonService:CommonService,
    private fb: FormBuilder,
    private _formBuilder: FormBuilder,
    private dialog: MatDialog
  ) {}
  

  async ngOnInit(){
    this.VOForm = this._formBuilder.group({
      VORows: this._formBuilder.array([]),
    });
    ELEMENT_DATA= await this.commonService.getList('/assignment/all').toPromise();
    this.VOForm = this.fb.group({
      VORows: this.fb.array(
        ELEMENT_DATA.map((val) =>
          this.fb.group({
            action: new FormControl('existingRecord'),
            code: new FormControl(val.position),
            name: new FormControl(val.name),
            date: new FormControl(val.date),
            files: new FormControl(val.files),
            id:new FormControl(val.id),
            time: new FormControl(val.weight),
            isEditable: new FormControl(true),
            isNewRow: new FormControl(false),
          })
        )
      ),
    });
    this.commonService.getList('/assignmnet/batch//all').subscribe((data:any)=>{
      this.batches=data;
      console.log(this.batches);
    })
    this.commonService.getList('/assignmnet/program/all').subscribe((data:any)=>{
      this.programs=data;
      console.log(this.programs);
    })
    this.commonService.getList('/assignmnet/course/all').subscribe((data:any)=>{
      this.courses=data;
    })
    this.commonService.getList('/assignment/student/all').subscribe(
      (data: any) => {
        this.studentList = data;
        console.log(this.studentList);
    
        for (const student of this.studentList) {
          const programMatch = this.programs.find(
            (p) => p.programId === student.programId
          );
          console.log(programMatch);
    
          const batchMatch = this.batches.find(
            (b) => b.batchId === student.batchId
          );
          console.log(batchMatch);
    
          if (programMatch && batchMatch) {
            this.commonStudents.push(student.studentName);
          }
        }
    
        console.log(this.commonStudents);
      },
      (error: any) => {
        console.log(error);
      }
    );
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
  
  showList(value: boolean) {
    this.showStudentList = value;
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
  this.commonService.getTopicByCourseId("/attendance/topics",courseID).subscribe((response:any)=>{
    this.topics = response;
    console.log(this.topics);
  })

}

  uploadFile() {
    const dialogRef = this.dialog.open(FileUploadComponent, {
      width: '700px',
    });
    dialogRef.afterClosed().subscribe((res) => {});
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  // @ViewChild('table') table: MatTable<PeriodicElement>;
  AddNewRow() {
    const control = this.VOForm.get('VORows') as FormArray;
    control.insert(0, this.initiateVOForm());
    this.dataSource = new MatTableDataSource(control.controls);
    this.buttonDisable = true;
  }

  deleteRow(index: number, key = '') {
    const dialogRef = this.dialog.open(DeleteConfrimationComponent, {
      data: {
        title: `Delete Topic`,
        message: 'Are you sure that you want to delete Topic?',
      },
    });
    dialogRef.afterClosed().subscribe((res) => {
      const control = this.VOForm.get('VORows') as FormArray;
      this.commonService
        .deleteData(control.controls[index].value.id, '/assigment/delete')
        .subscribe(
          (res) => {
            console.log(res);
          },
          (err) => {
            console.log(err);
          }
        );
      control.controls.splice(index, 1);
      this.dataSource = new MatTableDataSource(control.controls);
    });
  }

  // this function will enabled the select field for editd
  EditSVO(VOFormElement: any, i: any) {
    VOFormElement.get('VORows').at(i).get('isEditable').patchValue(false);
  }

  checkCondition() {
    const item = this.VOForm.get('VORows') as FormArray;
    return item.length > 0;
  }

  editDescription(VOFormElement: any, i: any, key = '') {
    const dialogRef = this.dialog.open(CommonDialogComponent, {
      data: {
        title: key === 'description' ? 'Summary' : 'Content',
        description: VOFormElement.get('VORows').at(i).get(key).value,
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
    // alert('SaveVO')
    VOFormElement.get('VORows').at(i).get('isEditable').patchValue(true);
    if (VOFormElement.get('VORows').at(i).value.id) {
      this.commonService
        .addData('/assigment/add', VOFormElement.get('VORows').at(i).value)
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
          VOFormElement.get('VORows').at(i).value.id,
          '/assigment/update',
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
    }
    this.buttonDisable = false;
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
      code: new FormControl(),
      name: new FormControl(),
      time: new FormControl(),
      date: new FormControl(),
      files: new FormControl(),
      id:new FormControl(),
      isEditable: new FormControl(false),
      isNewRow: new FormControl(false),
    });
  }
}
