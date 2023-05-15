import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-description-box',
  templateUrl: './description-box.component.html',
  styleUrls: ['./description-box.component.scss'],
})
export class DescriptionBoxComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialog: MatDialogRef<any>
  ) {}
  description: string = '';
  ngOnInit(): void {
    this.description=this.data.description
  }

  addDescription(){
    this.dialog.close(this.description)
  }
}
