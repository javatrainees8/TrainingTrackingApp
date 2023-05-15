import { HttpClient } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, FormArray, AbstractControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSelect, MatSelectChange } from '@angular/material/select';
import { MatTableDataSource } from '@angular/material/table';
import { CommonService } from 'src/app/services/common.service';
import { DeleteConfrimationComponent } from 'src/app/shared/components/delete-confrimation/delete-confrimation.component';
import { DescriptionBoxComponent } from 'src/app/shared/components/description-box/description-box.component';
import { SuccessDialogComponent } from 'src/app/shared/components/success-dialog/success-dialog.component';
let ELEMENT_DATA: any[] = [];

export interface selectedCourses {
 
  courseId:any,
  courseName:any,
  courseCode:any
}
@Component({
  selector: 'app-program',
  templateUrl: './program.component.html',
  styleUrls: ['./program.component.scss'],
})
export class ProgramComponent {
  displayedColumns: string[] = [
    'action',
    'code',
    'name',
    'theoryTime',
    'courseTime',
    'courseAssigned',
    'description',
  ];
  courses:any[]=[];
  selectedCourses:any[]=[];
   filteredData: any[] = []; // Data after applying filtering
  searchText: string = '';
  dataSource = new MatTableDataSource<any>();

  isLoading = true;
  @ViewChild(MatPaginator) set matPaginator(paginator: MatPaginator) {
    this.dataSource.paginator = paginator;
  }
  pageNumber: number = 1;
  VOForm!: FormGroup;
  isEditableNew: boolean = true;
  isNewRow:boolean=false
  constructor(
    private fb: FormBuilder,
    private _formBuilder: FormBuilder,
    private commonService:CommonService,
    private dialog: MatDialog,
    private http: HttpClient
  ) {}

 async ngOnInit() {
    

    this.VOForm = this._formBuilder.group({
      VORows: this._formBuilder.array([]),
      
    });
  
    
    ELEMENT_DATA=await this.commonService.getList('/program/all').toPromise()
    this.filteredData=this.displayedColumns;
    this.VOForm = this.fb.group({
      VORows: this.fb.array(
        ELEMENT_DATA.map((val) =>
          this.fb.group({
            action: new FormControl('existingRecord'),
            programName: new FormControl(val.programName),
            programCode: new FormControl(val.programCode),
            programId: new FormControl(val.programId),
           courseAssigned: new FormControl(val.courses),
            
            email: new FormControl(null),
            topics: new FormControl(null),
            theoryTime: new FormControl(val.theoryTime),
            practiceTime: new FormControl(val.practiceTime),
            programDescription:new FormControl(val.programDescription),
            isEditable: new FormControl(true),
            isNewRow: new FormControl(false),
          })
        )
      ),
    });
    
   
    this.isLoading = false;
    this.dataSource = new MatTableDataSource(
      (this.VOForm.get('VORows') as FormArray).controls
    );
    
  }

  getCourses(){
    this.commonService.getList("/program/all-courses").subscribe((data:any)=>{
      this.courses=data;
      console.log(this.courses);
      
    })

    
  }
  getSelectedCourses(event: MatSelectChange): void {
    this.selectedCourses = event.value;
    console.log(this.selectedCourses);

    for(const course of this.courses){
      for(const selectedCourse of this.selectedCourses){
        if(course.courseName==selectedCourse){
          for (const program of this.selectedCourses) {
            this.courses.push({
              courseId: program.courseId,
             courseName: program.courseName,
              courseCode: program.courseCode
              
            });
            console.log(this.selectedCourses);
          }
        }
      }
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

  applyFilter() {
    const searchText = this.searchText.toLowerCase();
    this.filteredData = this.displayedColumns.filter((row: any) => {
      // If no courses are selected, display all data
      if (this.courses.length === 0) {
        return true;
      }
    
    return this.courses.some(course => (row.courses as string[]).includes(course));
    });
  }
  

  AddNewRow() {
    const control = this.VOForm.get('VORows') as FormArray;
    control.insert(0, this.initiateVOForm());
    
   // control.controls = control.controls.reverse();

    this.dataSource = new MatTableDataSource(control.controls);
    this.dataSource.filterPredicate = (data: any, filterValue: string) =>
    data.value.name.trim().toLowerCase().indexOf(filterValue) !== -1;

  }

  deleteRow(index: number) {
    const dialogRef = this.dialog.open(DeleteConfrimationComponent, {
      data: {
        title: 'Delete Program',
        message: 'Are you sure that you want to delete program?',
      },
    });
    dialogRef.afterClosed().subscribe((res) => {
      if (res) {
        const control = this.VOForm.get('VORows') as FormArray;
          this.commonService
            .deleteData(control.controls[index].value.programId, '/program/delete')
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
      }
    });
  }
  // this function will enabled the select field for editd
  EditSVO(VOFormElement: any, i: any) {
    VOFormElement.get('VORows').at(i).get('isEditable').patchValue(false);
  }

  editDescription(VOFormElement: any, i: any) {
    const dialogRef = this.dialog.open(DescriptionBoxComponent, {
      width: '400px',
    });
    dialogRef.afterClosed().subscribe((res) => {
      if (res) {
        console.log(res);
       console.log( VOFormElement.get('VORows').at(i).get('programDescription'));

        VOFormElement.get('VORows').at(i).get('programDescription').patchValue(res);
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
          '/program/update',
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
      const formValue = VOFormElement.get('VORows').at(i).value;
    formValue.selectedCourses = this.selectedCourses;

    const control = this.VOForm.get('VORows') as FormArray;
    control.controls[0].patchValue(formValue); // Store in the first row of the form array

    this.commonService.addData('/program/add', formValue).subscribe(
      (res) => {
        console.log(res);
      },
      (err) => {
        console.log(err);
      }
    );

    }
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
      programName: new FormControl(null),
      programCode: new FormControl(null),
      programId: new FormControl(null),
      courseAssigned: new FormControl(null),
      email: new FormControl(null),
      topics: new FormControl(null),
      theoryTime: new FormControl(null),
      practiceTime: new FormControl(null),
      programDescription:new FormControl(null),
      isEditable: new FormControl(false),
      isNewRow: new FormControl(false),
    });
  }
}
