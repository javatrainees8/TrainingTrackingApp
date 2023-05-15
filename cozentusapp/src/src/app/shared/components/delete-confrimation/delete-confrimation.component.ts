import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-confrimation',
  templateUrl: './delete-confrimation.component.html',
  styleUrls: ['./delete-confrimation.component.scss'],
})
export class DeleteConfrimationComponent {
  constructor(
    private matDialogRef: MatDialogRef<DeleteConfrimationComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: any
  ) {}

  confirm() {
    this.matDialogRef.close('yes');
  }
}
