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


export interface StudentMarks {
  course_id:any;
  studentId: number;
  batchId: number;
  type:any;
  submissionDate: any;
  marksSecured:number;
}
let commonStudents: string[] = [];

@Component({
  selector: 'app-exams',
  templateUrl: './exams.component.html',
  styleUrls: ['./exams.component.scss'],
})
export class ExamsComponent {
  displayedColumns: string[] = [
    'action',
    'code',
    'name',
    'date',
    'time',
    'file',
  ];
  commonStudents: string[] = [];
  buttonDisable = false;
  studentList: any[] = []
  showStudentList: boolean = false;
  dataSource = new MatTableDataSource<any>();
  value: any;
  fieldValue1 = '';
  fieldValue2 = '';
  fieldValue3 = '';
  batchNameAndCode:any;
  batchStartdate:Date | undefined;
  ProgramNameAndCode:any;
 
  
  getBatchStartDate(batchNameAndCode:string): Date{
    const selectedBatch = this.batches.find(batches=>`${batches.batchCode}-${batches.batchName}`===batchNameAndCode);
    return selectedBatch?.batchStartdate;
  }
  batches:any[]=[];
  programs:any[]=[];
  courses:any[]=[];
  students:any[]=[];
  
  studentMarks: StudentMarks[]=[];
  marks:any[]=[];
  startDate: any = new Date();
  isLoading = true;
  successMessage: string | undefined

  pageNumber: number = 1;
  VOForm!: FormGroup;
  isEditableNew: boolean = true;
  constructor(
    private fb: FormBuilder,
    private _formBuilder: FormBuilder,
    private dialog: MatDialog,
    private commonService: CommonService
  ) {}

  async ngOnInit() {
    this.VOForm = this._formBuilder.group({
      VORows: this._formBuilder.array([]),
    });
    ELEMENT_DATA= await this.commonService.getList('/exam/all-exams').toPromise();
    
    this.VOForm = this.fb.group({
      VORows: this.fb.array(
        ELEMENT_DATA.map((val) =>
          this.fb.group({
            action: new FormControl('existingRecord'),
            
            evaluationName: new FormControl(val.evaluationName),
            totalMarks:new FormControl(val.totalMarks),
            submissionDate: new FormControl(val.submissionDate),
            files: new FormControl(val.files),
            time: new FormControl(val.time),
            isEditable: new FormControl(true),
            isNewRow: new FormControl(false),
          })
        )
      ),
    });
    this.commonService.getList('/batch-program/batch/show/all').subscribe((data:any)=>{
      this.batches=data;
      console.log(this.batches);
    })
    this.commonService.getList('/batch-program/program/show/all').subscribe((data:any)=>{
      this.programs=data;
      console.log(this.programs);
    })
    this.commonService.getList('/batch-program/course/show/all').subscribe((data:any)=>{
      this.courses=data;
    })

    
  
      


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
  onBatchSelected(): void {
    console.log('batchNameAndCode:', this.batchNameAndCode); // Debugging statement
    if (!this.batchNameAndCode) {
      return; // if batchNameAndCode is not defined, exit the function
    }
  
    const selectedBatch = this.batchNameAndCode.split('-');
    console.log('selectedBatch:', selectedBatch); // Debugging statement
    const batchName = selectedBatch[0];
    const batchCode = selectedBatch[1];
  
    console.log('batchName:', batchName); // Debugging statement
    console.log('batchCode:', batchCode); // Debugging statement

    // call your backend API to get the program ID based on the selected batch
    this.commonService.getProgramsByBatch("/exam/programs",14).subscribe((response: any) => {
      this.programs = response;
      console.log(this.programs);
    });
  }
  onProgramSelected(){
    console.log(this.fieldValue3);
    this.commonService.getStudentByProgramId("/exam/students",3).subscribe((response: any) => {
      this.students = response;
      console.log(this.students);
    });
this.commonService.getCoursesByProgram("/exam/all-courses",3).subscribe((response: any) => {
     
  this.courses = response;
  console.log(this.courses);
    });
  }

  
  saveExam(){
   
      const studentMarks: StudentMarks[] = [];
      const currentDate = new Date(); // Get the current date
    
      for (const student of this.students) {
        studentMarks.push({
          studentId: student.studentId,
          course_id:student.course_id,
         batchId: student.batchId,
         type:'Exam',
          submissionDate: currentDate.toISOString(),
          marksSecured: student.marks
        });
        console.log(studentMarks);
      }
      this.commonService.addData('/exam/add-marks',studentMarks).subscribe(
        () => {
          this.successMessage = 'Attendance saved successfully!';
        },
        error => console.error(error)
        );
      
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
    dialogRef.afterClosed().subscribe((res) => {});
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
    this.dataSource = new MatTableDataSource(control.controls);
    this.buttonDisable = true;
  }

  deleteRow(index: number, key = '') {
    const dialogRef = this.dialog.open(DeleteConfrimationComponent, {
      data: {
        title: `Delete Exam`,
        message: 'Are you sure that you want to delete Exam?',
      },
    });
    dialogRef.afterClosed().subscribe((res) => {
      const control = this.VOForm.get('VORows') as FormArray;
      control.controls.splice(index, 1);
      this.commonService
        .deleteData(control.controls[index].value.evaluationId, '/exam/delete-exam')
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
      this.commonService.updateData(
        VOFormElement.get('VORows').at(i).value.id,
        '/exam/update-exam',
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
        
        .addData('/exam/add-exam', VOFormElement.get('VORows').at(i).value)
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
     
      evaluationName: new FormControl(),
      totalMarks:new FormControl(),
      time: new FormControl(),
      submissionDate: new FormControl(),
     
      files: new FormControl(),
      isEditable: new FormControl(false),
      isNewRow: new FormControl(false),
    });
  }
}
