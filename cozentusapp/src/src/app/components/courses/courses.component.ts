import { Component, OnInit, ViewChild } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { startWith, tap } from 'rxjs/operators';
import { CommonService } from 'src/app/services/common.service';
import { DeleteConfrimationComponent } from 'src/app/shared/components/delete-confrimation/delete-confrimation.component';
import { DescriptionBoxComponent } from 'src/app/shared/components/description-box/description-box.component';
let ELEMENT_DATA: any[] = [];

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss'],
})
export class CoursesComponent {
  displayedColumns: any[] = [
    'action',
    'name',
    'code',
    'theoryTime',
    'courseTime',
    'description',
    'topics',
  ];
  buttonDisable = false;
  dataSource = new MatTableDataSource<any>();
  isLoading = true;
  tempArray: any[] = [];
  pageNumber: number = 1;
  VOForm!: FormGroup;
  isEditableNew: boolean = true;
  @ViewChild(MatPaginator) set matPaginator(paginator: MatPaginator) {
    this.dataSource.paginator = paginator;
  }
  constructor(
    private fb: FormBuilder,
    private _formBuilder: FormBuilder,
    private dialog: MatDialog,
    private commonService: CommonService
  ) {}

  async ngOnInit(){
    this.VOForm = this._formBuilder.group({
      VORows: this._formBuilder.array([]),
    });
    ELEMENT_DATA=await this.commonService.getList('/course/all').toPromise()
    this.VOForm = this.fb.group({
      VORows: this.fb.array(
        ELEMENT_DATA.map((val) =>
          this.fb.group({
            action: new FormControl('existingRecord'),
            course_code: new FormControl(val.course_code),
            course_id: new FormControl(val.course_id),
            programId:new FormControl(val.programId),
            course_name: new FormControl(val.course_name),
            theorytime: new FormControl(val.theorytime),
            practicetime: new FormControl(val.practicetime),
            course_description: new FormControl(val.course_description),
            topics: new FormControl(null),
            isEditable: new FormControl(true),
            isNewRow: new FormControl(false),
          })
        )
      ),
    });
    this.isLoading = false;

    this.dataSource.paginator = this.paginator;
    this.dataSource = new MatTableDataSource(
      (this.VOForm.get('VORows') as FormArray).controls
    );

    const filterPredicate = this.dataSource.filterPredicate;
    this.dataSource.filterPredicate = (data: AbstractControl, filter) => {
      return filterPredicate.call(this.dataSource, data.value, filter);
    };
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

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    (this.VOForm.get('VORows') as FormArray).controls = (
      this.VOForm.get('VORows') as FormArray
    ).controls.filter((item) => item.value.name.indexOf(filterValue) === -1);
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  AddNewRow() {
    this.buttonDisable = true;
    const control = this.VOForm.get('VORows') as FormArray;
    control.insert(0, this.initiateVOForm());
    control.controls = control.controls.reverse();
    this.dataSource = new MatTableDataSource(control.controls);

    const filterPredicate = this.dataSource.filterPredicate;
    this.dataSource.filterPredicate = (data: AbstractControl, filter) => {
      return filterPredicate.call(this.dataSource, data.value, filter);
    };
  }

  deleteRow(index: number) {
    const dialogRef = this.dialog.open(DeleteConfrimationComponent, {
      data: {
        title: 'Delete Course',
        message: 'Are you sure that you want to delete course?',
      },
    });
    dialogRef.afterClosed().subscribe((res) => {
      if (res) {
        const control = this.VOForm.get('VORows') as FormArray;
        control.controls.splice(index, 1);
        this.commonService
          .deleteData(control.controls[index].value.course_id, '/course/delete')
          .subscribe(
            (res) => {
              console.log(res);
            },
            (err) => {
              console.log(err);
            }
          );
        this.dataSource = new MatTableDataSource(control.controls);
      }
    });
  }

  // this function will enabled the select field for editd
  EditSVO(VOFormElement: any, i: any) {
    VOFormElement.get('VORows').at(i).get('isEditable').patchValue(false);
    this.tempArray = (this.VOForm.get('VORows') as FormArray).controls;
  }

  editDescription(VOFormElement: any, i: any) {
    const dialogRef = this.dialog.open(DescriptionBoxComponent, {
      width: '400px',
    });
    dialogRef.afterClosed().subscribe((res) => {
      if (res) {
        console.log(res);
       console.log( VOFormElement.get('VORows').at(i).get('course_description'));

        VOFormElement.get('VORows').at(i).get('course_description').patchValue(res);
      }
    });
  }

  // On click of correct button in table (after click on edit) this method will call
  SaveVO(VOFormElement: any, i: any) {
    this.buttonDisable = false;
    VOFormElement.get('VORows').at(i).get('isEditable').patchValue(true);
    if (VOFormElement.get('VORows').at(i).value.id) {
      this.commonService
        .updateData( VOFormElement.get('VORows').at(i).value.id,'/course/update',VOFormElement.get('VORows').at(i).value)
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
        .addData('/course/add',
          VOFormElement.get('VORows').at(i).value)
        .subscribe(
          (res) => {
            console.log(res);
          },
          (err) => {
            console.log(err);
          }
        );
    }
    this.tempArray = (this.VOForm.get('VORows') as FormArray).controls;
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
      course_code: new FormControl(null),
      course_id: new FormControl(null),
      programId:new FormControl(null),
      course_name: new FormControl(null),
      theory_time: new FormControl(null),
      practice_time: new FormControl(null),
      course_description: new FormControl(null),
      topics: new FormControl(null),
      isEditable: new FormControl(true),
      isNewRow: new FormControl(false),
    });
  }
}
