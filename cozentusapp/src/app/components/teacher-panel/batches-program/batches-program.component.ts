import { Component, OnInit, ViewChild } from '@angular/core';
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
import { forkJoin } from 'rxjs';
import { CommonService } from 'src/app/services/common.service';
import { CommonDialogComponent } from 'src/app/shared/components/common-dialog/common-dialog.component';
import { DeleteConfrimationComponent } from 'src/app/shared/components/delete-confrimation/delete-confrimation.component';
import { FileUploadComponent } from 'src/app/shared/components/file-upload/file-upload.component';

let ELEMENT_DATA: any[] = [];

@Component({
  selector: 'app-batches-program',
  templateUrl: './batches-program.component.html',
  styleUrls: ['./batches-program.component.scss'],
})
export class BatchesProgramComponent implements OnInit{
  completedTopics: string[] = [];
  inProgressTopics: string[] = [];
  courseCompletionPercentage: number = 0;
  batch: any[] =[];
  batchNameAndCode!: string;
  program: any[]=[];
  topics:any[]=[];
  course: any[]=[];
  student:any[]=[];
  Teacher:any[]=[];
  batchStartdate: Date | undefined;
  value: string | undefined;
  fieldValue2: string | undefined;
  getBatchStartDate(batchNameAndCode: string): Date{
    const selectedBatch = this.batch.find(batch => `${batch.batchName}-${batch.batchCode}` === batchNameAndCode);
    return selectedBatch?.batchStartdate
    ;
  }
  displayedColumns: string[] = [
    'code',
    'name',
    'completed',
    'inProgress',
    'courseCompletionProgress',
  ];
  dataSource = new MatTableDataSource<any>();

  isLoading = true;

  pageNumber: number = 1;
  VOForm!: FormGroup;
  isEditableNew: boolean = true;
  constructor(
    private fb: FormBuilder,
    private _formBuilder: FormBuilder,
    private dialog: MatDialog,
    private commonService: CommonService
  ) {}

  async ngOnInit(){{
    const batch$ = this.commonService.getList('/batch-program/batch/all');
    const program$ = this.commonService.getList('/batch-program/program/all');
    const course$ = this.commonService.getList('/batch-program/course/all');
      
    forkJoin([batch$, program$, course$]).subscribe(([batch, programs, courses]) => {
      console.log(batch);
      console.log(programs);
      console.log(courses);
      this.batch = batch;
      this.program = programs;
      this.course = courses;
    }
    );
  }

    // const [batchName, batchCode] = this.batchNameAndCode.split('-');
    this.VOForm = this._formBuilder.group({
      VORows: this._formBuilder.array([]),
    });
    
 const name=await this.commonService.getList('/batch-program/all')
      .toPromise().then((topics: any[]) => {
        console.log(topics);
        let completedTopicCount = 0;
        let totalTopicCount = topics.length;
        console.log(totalTopicCount)
         ELEMENT_DATA = topics.map((topic, i) => {
          const completed = topic.topicPercentageCompleted === 100;
          if (completed) {
            completedTopicCount++;
          }
          return {
            code: `${100+i}`,
            name: topic.topicName,
            completed,
            inProgress: completed ? '' : topic.topicName,
            courseCompletionPercentage: Math.round((completedTopicCount / totalTopicCount) * 100),
          };
        });
        for (let i = 0; i < ELEMENT_DATA.length; i++) {
          const topic = ELEMENT_DATA[i];
          if (!topic.completed) {
            this.inProgressTopics[i] = topic.name;
            this.completedTopics[i] = '';
          } else {
            this.completedTopics[i] = topic.name;
            this.inProgressTopics[i] = '';
          }
        }
        console.log('inProgressTopics:', this.inProgressTopics);
        console.log('completedTopics:', this.completedTopics);
          console.log(ELEMENT_DATA)
        this.VOForm.setControl('VORows', this.fb.array(
          ELEMENT_DATA.map((val, i) =>
            this.fb.group({
              code : new FormControl(val.code),
              completed: new FormControl(val.completed),
              name: new FormControl(val.name),
              inprogres: this.fb.array(this.inProgressTopics.slice(0, i + 1).map(c => new FormControl(c))),
              completedTopics:this.fb.array(this.completedTopics.slice(0, i + 1).map(c => new FormControl(c))),
              courseCompletionProgress: new FormControl(val.courseCompletionPercentage),
              isNewRow: new FormControl(false),
            })
          )
        ));
      });
    // end of form group cretation
  // end of form group cretation
  console.log('VOForm:', this.VOForm);
  console.log(this.VOForm.get("VORows")?.value)
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
      this.commonService.getProgramsByBatch("/batch-program/programs",14).subscribe((response: any) => {
      this.program = response;
      console.log(this.program);
    });
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
  getCourseCompletionPercentage(): number {
    const completedTopics = this.topics.filter(topic => topic.topicPercentageCompleted === 100);
    return Math.round(completedTopics.length / this.topics.length * 100);
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
      code : new FormControl(null),
      completed: new FormControl(null),
      name: new FormControl(null),
      inprogres: new FormControl(null),
      completedTopics:new FormControl(null),
      courseCompletionProgress: new FormControl( null),
      isNewRow: new FormControl(false),
    });
  }
}
