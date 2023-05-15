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
import { CommonDialogComponent } from 'src/app/shared/components/common-dialog/common-dialog.component';
import { DeleteConfrimationComponent } from 'src/app/shared/components/delete-confrimation/delete-confrimation.component';
import { FileUploadComponent } from 'src/app/shared/components/file-upload/file-upload.component';
import { CommonService } from 'src/app/services/common.service';
const ELEMENT_DATA: any[] = [];

@Component({
  selector: 'app-batches-program',
  templateUrl: './batches-program.component.html',
  styleUrls: ['./batches-program.component.scss'],
})
export class BatchesProgramComponent {

  programs:any[]=[];
  batches:any[]=[];
  batchNameAndCode:any;
  batchStartdate:Date | undefined;
  value:string |undefined;
  selectedOption:any;
  courses: any[]=[];
  getBatchStartDate(batchNameAndCode:string): Date{
    const selectedBatch = this.batches.find(batches=>`${batches.batchCode}-${batches.batchName}`===batchNameAndCode);
    return selectedBatch?.batchStartdate;
  }
  displayedColumns: string[] = [
    'code',
    'name',
    'completed',
    'inProgress',
    'courseCompletionProgress',
  ];
  dataSource = new MatTableDataSource<any>();

  fieldValue1 = '';
  fieldValue2:string = '';
  fieldValue3:string = '';
  ProgramNameAndCode:any;
  isLoading = true;

  pageNumber: number = 1;
  VOForm!: FormGroup;
  isEditableNew: boolean = true;
  constructor(
    private fb: FormBuilder,
    private _formBuilder: FormBuilder,
    private dialog: MatDialog,
    private commonService:CommonService
  ) {}

  async ngOnInit(){
    this.VOForm = this._formBuilder.group({
      VORows: this._formBuilder.array([]),
    });
    this.commonService.getList('/batch/all').subscribe((data:any)=>{
      this.batches=data;
    })
    this.commonService.getList('/batch-program/program/show/all').subscribe((data:any)=>{
      this.programs=data;
    })
    
    
   // end of form group cretation
    this.isLoading = false;
    this.dataSource = new MatTableDataSource(
      (this.VOForm.get('VORows') as FormArray).controls
    );
    this.dataSource.paginator = this.paginator;

    const filterPredicate = this.dataSource.filterPredicate;
    this.dataSource.filterPredicate = (data: AbstractControl, filter) => {
      return filterPredicate.call(this.dataSource, data.value, filter);
    };

    //Custom filter according to name column
    // this.dataSource.filterPredicate = (data: {name: string}, filterValue: string) =>
    //   data.name.trim().toLowerCase().indexOf(filterValue) !== -1;
  }
  onBatchSelected(){
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
    this.commonService.getProgramsByBatch("/attendance/programs",14).subscribe((response: any) => {
      this.programs = response;
      console.log(this.programs);
    });

  }
  async onProgramSelected() {
    try {
      const response: any = await this.commonService.getCoursesByProgram("/batch-program/course-completion", 16).toPromise();
      this.courses = response;
      console.log("Courses:", this.courses);
  
      if (Array.isArray(this.courses)) {
        this.VOForm = this.fb.group({
          VORows: this.fb.array([])
        });
        console.log("VOForm initialized:", this.VOForm);
  
        const VORowsFormArray = this.VOForm.get('VORows') as FormArray;
  
        this.courses.forEach((val) => {
          const formGroup = this.fb.group({
            orderNum: new FormControl(val.orderNum),
            completedTopics: new FormControl(val.completedTopics),
            course_name: new FormControl(val.course_name),
            inProgressTopics: new FormControl(val.inProgressTopics),
            courseCompletionProgress: new FormControl(val.courseCompletionProgress),
            isNewRow: new FormControl(false),
          });
  
          VORowsFormArray.push(formGroup);
        });
  
        console.log("VORows populated:", VORowsFormArray.value);
      }
    } catch (error) {
      console.log("Error fetching courses:", error);
    }
  
    console.log("Final VOForm:", this.VOForm);
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
    this.dataSource = new MatTableDataSource(control.controls);
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
      control.controls.splice(index, 1);
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
    // alert('SaveVO')
    VOFormElement.get('VORows').at(i).get('isEditable').patchValue(true);
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
      orderNum: new FormControl(),
      completedTopics: new FormControl(),
      course_name: new FormControl(),
      inProgressTopics: new FormControl(),
      courseCompletionProgress: new FormControl(),
      isNewRow: new FormControl(false),
    });
  }
}
