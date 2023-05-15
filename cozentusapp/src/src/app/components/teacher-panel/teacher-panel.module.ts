import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { TeacherLayoutComponent } from './teacher-layout/teacher-layout.component';
import { MatTabsModule } from '@angular/material/tabs';
import { BatchesProgramComponent } from './batches-program/batches-program.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { AttedanceComponent } from './attedance/attedance.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { ExamsComponent } from './exams/exams.component';
import { AssigmentComponent } from './assigment/assigment.component';

const route: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path:'exams',
    component:ExamsComponent
  },
  {
    path:'assigment',
    component:AssigmentComponent
  }
];

@NgModule({
  declarations: [HomeComponent, TeacherLayoutComponent, BatchesProgramComponent, AttedanceComponent, ExamsComponent, AssigmentComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(route),
    SharedModule,
    MatCardModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatIconModule,
    MatSelectModule,
    MatDatepickerModule,
    MatCheckboxModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatPaginatorModule,
    MatTableModule,
    MatIconModule,
    MatMenuModule,
    MatTabsModule,
  ],
})
export class TeacherPanelModule {}
