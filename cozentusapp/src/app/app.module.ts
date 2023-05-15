import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTableModule } from '@angular/material/table';
import { CoursesComponent } from './components/courses/courses.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DescriptionBoxComponent } from './shared/components/description-box/description-box.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatMenuModule } from '@angular/material/menu';
import { CustomPaginatorComponent } from './shared/components/custom-paginator/custom-paginator.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { TopicComponent } from './components/topic/topic.component';
import { CommonDialogComponent } from './shared/components/common-dialog/common-dialog.component';
import { DeleteConfrimationComponent } from './shared/components/delete-confrimation/delete-confrimation.component';
import { FileUploadComponent } from './shared/components/file-upload/file-upload.component';
import { TeacherComponent } from './components/teacher/teacher.component';
import { StudentComponent } from './components/student/student.component';
import { SuccessDialogComponent } from './shared/components/success-dialog/success-dialog.component';
import { ProgramComponent } from './components/program/program.component';
import { MatSortModule } from '@angular/material/sort';
import { BatchComponent } from './components/batch/batch.component';
import {MatDatepickerModule} from '@angular/material/datepicker'
import { MatNativeDateModule } from '@angular/material/core';
import { FilterPipe } from './filter.pipe';
import { SharedModule } from './shared/shared.module';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import {MatCheckboxModule} from '@angular/material/checkbox';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    CoursesComponent,
    DescriptionBoxComponent,
    CustomPaginatorComponent,
    TopicComponent,
    CommonDialogComponent,
    DeleteConfrimationComponent,
    FileUploadComponent,
    TeacherComponent,
    StudentComponent,
    SuccessDialogComponent,
    ProgramComponent,
    BatchComponent,
    FilterPipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatDatepickerModule,
    MatNativeDateModule,
    FormsModule,
    MatCardModule,
    MatSortModule,
    MatDialogModule,
    MatMenuModule,
    MatIconModule,
    MatInputModule,
    HttpClientModule,
    MatPaginatorModule,
    MatTableModule,
    ReactiveFormsModule,
    SharedModule,
    MatSelectModule,
    FormsModule,
    MatFormFieldModule,
    MatToolbarModule,
    MatButtonModule,
    BrowserAnimationsModule,
    MatCheckboxModule
  ],
  providers: [{ provide: LOCALE_ID, useValue: 'en' }],//{ provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  entryComponents: [
    DescriptionBoxComponent,
    DeleteConfrimationComponent,
    CommonDialogComponent,
    FileUploadComponent,
    SuccessDialogComponent,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
