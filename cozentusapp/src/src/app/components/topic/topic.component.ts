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
import { FileuploadService } from 'src/app/services/fileupload.service';
import { CommonDialogComponent } from 'src/app/shared/components/common-dialog/common-dialog.component';
import { DeleteConfrimationComponent } from 'src/app/shared/components/delete-confrimation/delete-confrimation.component';
import { DescriptionBoxComponent } from 'src/app/shared/components/description-box/description-box.component';
import { FileUploadComponent } from 'src/app/shared/components/file-upload/file-upload.component';

let ELEMENT_DATA: any[] = [];

@Component({
  selector: 'app-topic',
  templateUrl: './topic.component.html',
  styleUrls: ['./topic.component.scss'],
})
export class TopicComponent {
  displayedColumns: any[] = [
    'action',
    'code',
    'name',
    'theoryTime',
    'courseTime',
    'description',
    'topics',
    'file',
  ];
  dataSource = new MatTableDataSource<any>();
  buttonDisable = false;
  isLoading = true;

  pageNumber: number = 1;
  VOForm!: FormGroup;
  isEditableNew: boolean = true;
  constructor(
    private fb: FormBuilder,
    private _formBuilder: FormBuilder,
    private dialog: MatDialog,
    private commonService: CommonService,
    private fileUploadService:FileuploadService
  ) {}

 async ngOnInit() {
    this.VOForm = this._formBuilder.group({
      VORows: this._formBuilder.array([]),
    });
    ELEMENT_DATA=await this.commonService.getList('/topic/all').toPromise()
     this.VOForm = this.fb.group({
      VORows: this.fb.array(
        ELEMENT_DATA.map((val) =>
          this.fb.group({
            action: new FormControl('existingRecord'),
            topicCode: new FormControl(val.topicCode),
            orderNum: new FormControl(val.orderNum),
            topicName: new FormControl(val.topicName),
            files: new FormControl(null),
            theoryTime: new FormControl(val.theoryTime),
            practicalTime: new FormControl(val.practicalTime),
            topicId: new FormControl(val.topicId),
            courseId:new FormControl(val.courseId),
            content: new FormControl(val.content),
            topicSummary: new FormControl(val.topicSummary),
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

    this.dataSource.filterPredicate = (data: any, filterValue: string) =>
      data.value.name.trim().toLowerCase().indexOf(filterValue) !== -1;
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
  AddNewRow() {
    const control = this.VOForm.get('VORows') as FormArray;
    control.insert(0, this.initiateVOForm());
    control.controls = control.controls.reverse();
    this.buttonDisable = true;
    this.dataSource = new MatTableDataSource(control.controls);
    this.dataSource.filterPredicate = (data: any, filterValue: string) =>
      data.value.name.trim().toLowerCase().indexOf(filterValue) !== -1;
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
        .deleteData(control.controls[index].value.topicId, '/topic/delete')
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
    this.buttonDisable = false;

    if (VOFormElement.get('VORows').at(i).value.id) {
      this.commonService
        .updateData(
          VOFormElement.get('VORows').at(i).value.id,
          '/topic/update',
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
        .addData('/topic/add', VOFormElement.get('VORows').at(i).value)
        .subscribe(
          (res) => {
            console.log(res);
          },
          (err) => {
            console.log(err);

        }
      );
    }
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
      action: new FormControl('existingRecord'),
      topicCode: new FormControl(null),
            orderNum: new FormControl(null),
            topicName: new FormControl(null),
            files: new FormControl(null),
            theoryTime: new FormControl(null),
            practicalTime: new FormControl(null),
            topicId: new FormControl(null),
            courseId:new FormControl(null),
            content: new FormControl(null),
            topicSummary: new FormControl(null),
            isEditable: new FormControl(true),
            isNewRow: new FormControl(false),
    });
  }
}
