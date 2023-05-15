import { HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FileuploadService } from 'src/services/fileupload.service';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss'],
})
export class FileUploadComponent {
  files: any[] = [];
  constructor(private fileUploadService:FileuploadService ,public dialogRef: MatDialogRef<FileUploadComponent>) { }
  
  filesChangeEmiter(event: any) {
    this.files.push(event[0]);
  }

  onFileChange(event: any) {
    this.files.push(event.target.files[0]);
  }

  removeFile(index: number) {
    this.files.splice(index, 1);
  }

  uploadFiles() {
    const formData = new FormData();
    for (let i = 0; i < this.files.length; i++) {
      formData.append('file', this.files[i]);
    }
    this.fileUploadService.uploadFiles(formData).subscribe((res) => {
      console.log(res);
      this.dialogRef.close(res);
    
    }, error => {
      console.error(error);
    });
  }
}

