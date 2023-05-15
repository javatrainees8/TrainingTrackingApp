import { Component, ViewChild, AfterViewInit } from '@angular/core';
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
import { DeleteConfrimationComponent } from 'src/app/shared/components/delete-confrimation/delete-confrimation.component';
import { DescriptionBoxComponent } from 'src/app/shared/components/description-box/description-box.component';
import { SuccessDialogComponent } from 'src/app/shared/components/success-dialog/success-dialog.component';


export interface selectedCourses {
  courseId:any,
  courseName:any,
  courseCode:any
}
let ELEMENT_DATA: any[] = [];
@Component({
  selector: 'app-teacher',
  templateUrl: './teacher.component.html',
  styleUrls: ['./teacher.component.scss'],
})
export class TeacherComponent implements AfterViewInit {
  displayedColumns: string[] = ['action', 'name', 'courseAssigned', 'email'];
  courses:any[]=[];
  dataSource = new MatTableDataSource<any>();
  buttonDisable = false;
  isLoading = true;
  selectedCourses:any[]=[];
  @ViewChild(MatPaginator) set matPaginator(paginator: MatPaginator) {
    this.dataSource.paginator = paginator;
  }
  pageNumber: number = 1;
  VOForm!: FormGroup;
  isEditableNew: boolean = true;
  constructor(
    private fb: FormBuilder,
    private commonService: CommonService,
    private _formBuilder: FormBuilder,
    private dialog: MatDialog
  ) {}

 async ngOnInit() {
    this.VOForm = this._formBuilder.group({
      VORows: this._formBuilder.array([]),
    });
    
   ELEMENT_DATA=await this.commonService.getList('/teacher/all').toPromise()
    this.VOForm = this.fb.group({
      VORows: this.fb.array(
        ELEMENT_DATA.map((val) =>
          this.fb.group({
            action: new FormControl('existingRecord'),
            teacherName: new FormControl(val.teacherName),
            courseAssigned: new FormControl(val.courseAssigned),
            teacherEmail: new FormControl(val.teacherEmail),
            teacherId: new FormControl(val.teacherId),
            //courseId:new FormControl(val.courseId),
           // teacherCode:new FormControl(val.teacherCode),
           // topics: new FormControl(null),
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
    const filterPredicate = this.dataSource.filterPredicate;
    this.dataSource.filterPredicate = (data: AbstractControl, filter) => {
      return filterPredicate.call(this.dataSource, data.value, filter);
    };
  }

  getCourses(){
    
    this.commonService.getList("/teacher/all-courses").subscribe((data:any)=>{
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
  ngAfterViewInit() {}
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;

    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  AddNewRow() {
    const control = this.VOForm.get('VORows') as FormArray;
    control.insert(0, this.initiateVOForm());
    //control.controls = control.controls.reverse();
    this.buttonDisable = true;
    this.dataSource = new MatTableDataSource(control.controls);
  }

   deleteRow(index: number) {
    const dialogRef = this.dialog.open(DeleteConfrimationComponent, {
      data: {
        title: 'Delete Teacher',
        message: 'Are you sure that you want to delete teacher?',
      },
    });
    dialogRef.afterClosed().subscribe((res) => {
     
      if (res) {
        const control = this.VOForm.get('VORows') as FormArray;
          this.commonService
            .deleteData(control.controls[index].value.teacherId, '/teacher/delete')
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
        VOFormElement.get('VORows').at(i).get('description').patchValue(res);
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
          '/teacher/update',
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
      this.commonService
        .addData('/teacher/add',formValue)
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
        console.log(paginator);

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
        console.log(to);
        console.log(from);
        console.log(list[0]);

        if (list.length >= 1) list[0].innerHTML = rows;
      },
      0,
      paginator.pageIndex
    );
  }

  initiateVOForm(): FormGroup {
    return this.fb.group({
      action: new FormControl('existingRecord'),
      teacherName: new FormControl(null),
      courseAssigned: new FormControl(null),
      teacherEmail: new FormControl(null),
      teacherId: new FormControl(null),
      //courseId:new FormControl(null),
      //teacherCode:new FormControl(null),
      //topics: new FormControl(null),
      isEditable: new FormControl(false),
      isNewRow: new FormControl(false),
    });
  }
}
