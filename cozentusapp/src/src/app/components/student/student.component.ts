import { ChangeDetectionStrategy } from '@angular/compiler';
import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  DoCheck,
  ViewChild,
} from '@angular/core';
import { FormGroup, FormBuilder, FormControl, FormArray } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CommonService } from 'src/app/services/common.service';
import { DeleteConfrimationComponent } from 'src/app/shared/components/delete-confrimation/delete-confrimation.component';
import { DescriptionBoxComponent } from 'src/app/shared/components/description-box/description-box.component';
import { SuccessDialogComponent } from 'src/app/shared/components/success-dialog/success-dialog.component';

let ELEMENT_DATA: any[] = [];
@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.scss'],
})
export class StudentComponent implements AfterViewInit, DoCheck {
  displayedColumns: string[] = ['action', 'code', 'name', 'email'];
  @ViewChild(MatPaginator) set matPaginator(paginator: MatPaginator) {
    this.dataSource.paginator = paginator;
  }
  buttonDisable = false;
  // @ViewChild(MatSort) set matSort(sort: MatSort) {
  //   this.dataSource.sort = sort;
  // }

  dataSource = new MatTableDataSource<any>();

  isLoading = true;

  pageNumber: number = 1;
  VOForm!: FormGroup;
  isEditableNew: boolean = true;
  constructor(
    private fb: FormBuilder,
    private commonService: CommonService,
    private _formBuilder: FormBuilder,
    private cd: ChangeDetectorRef,
    private dialog: MatDialog
  ) {}
  @ViewChild(MatSort, { static: false }) sort!: MatSort;

  async ngOnInit(){
    this.VOForm = this._formBuilder.group({
      VORows: this._formBuilder.array([]),
    });
    ELEMENT_DATA= await this.commonService.getList('/student/all').toPromise();
    this.VOForm = this.fb.group({
      VORows: this.fb.array(
        ELEMENT_DATA.map((val) =>
          this.fb.group({
            action: new FormControl('existingRecord'),
            studentName: new FormControl(val.studentName),
            studentCode: new FormControl(val.studentCode),
            studentEmail: new FormControl(val.studentEmail),
            studentId: new FormControl(val.studentId),
            programId:new FormControl(val.programId),
            batchId:new FormControl(val.batchId),
            createdDate:new FormControl(val.createdDate),
            createdBy:new FormControl(val.createdBy),
            updatedDate:new FormControl(val.updatedDate),
            updatedBy:new FormControl(val.updatedBy),
            topics: new FormControl(null),
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
    this.dataSource.sort = this.sort;

    // this.dataSource.filterPredicate = (data: {name: string}, filterValue: string) =>
    //   data.name.trim().toLowerCase().indexOf(filterValue) !== -1;
    //   console.log( this.dataSource.filterPredicate);
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

  ngDoCheck(): void {
    this.cd.detectChanges();
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.paginatorList = document.getElementsByClassName(
      'mat-paginator-range-label'
    );

    this.cd.detectChanges();
    this.onPaginateChange(this.paginator, this.paginatorList);

    this.paginator.page.subscribe(() => {
      // this is page change event
      this.onPaginateChange(this.paginator, this.paginatorList);
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  // @ViewChild('table') table: MatTable<PeriodicElement>;
  AddNewRow() {
    const control = this.VOForm.get('VORows') as FormArray;
    control.insert(0, this.initiateVOForm());
    control.controls = control.controls.reverse();
    this.buttonDisable = true;
    this.dataSource = new MatTableDataSource(control.controls);
    this.dataSource.sort = this.sort;
  }

  deleteRow(index: number) {
    const dialogRef = this.dialog.open(DeleteConfrimationComponent, {
      data: {
        title: 'Delete Student',
        message: 'Are you sure that you want to delete Student?',
      },
    });
    dialogRef.afterClosed().subscribe((res) => {
      if (res) {
        const control = this.VOForm.get('VORows') as FormArray;
        if (res) {
          this.commonService
            .deleteData(control.controls[index].value.studentId, '/student/delete')
            .subscribe(
              (res) => {
                console.log(res);
              },
              (err) => {
                console.log(err);
              }
            );
        }
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
    // alert('SaveVO')
    this.buttonDisable = false;
    VOFormElement.get('VORows').at(i).get('isEditable').patchValue(true);
    if (VOFormElement.get('VORows').at(i).value.id) {
      this.commonService
        .updateData(
          VOFormElement.get('VORows').at(i).value.id,
          '/student/update',
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
        .addData('/student/add', VOFormElement.get('VORows').at(i).value)
        .subscribe(
          (res) => {
            console.log(res);
          },
          (err) => {
            console.log(err);

          }
        );
    }
  
    this.dialog.open(SuccessDialogComponent, {
      width: '400px',
      data: {
        title: 'Student Added',
        message: `An email has been sent to ${
          VOFormElement.get('VORows').at(i).get('name').value
        } with email and password`,
      },
    });
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
      studentName: new FormControl(null),
      studentCode: new FormControl(null),
      studentEmail: new FormControl(null),
      studentId:new FormControl(null),
      programId:new FormControl(null),
      batchId:new FormControl(null),
      createdDate:new FormControl(null),
      createdBy:new FormControl(null),
      updatedDate:new FormControl(null),
      updatedBy:new FormControl(null),
      topics: new FormControl(null),
      isEditable: new FormControl(false),
      isNewRow: new FormControl(false),
      id: new FormControl(),
    });
  }
}
