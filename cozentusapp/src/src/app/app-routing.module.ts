import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { CoursesComponent } from './components/courses/courses.component';
import { TopicComponent } from './components/topic/topic.component';
import { TeacherComponent } from './components/teacher/teacher.component';
import { StudentComponent } from './components/student/student.component';
import { ProgramComponent } from './components/program/program.component';
import { BatchComponent } from './components/batch/batch.component';
import { MarksComponent } from './marks/marks.component';


const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'courses',
    component: CoursesComponent,
  },

  {
    path: 'topics',
    component: TopicComponent,
  },
  {
    path: 'teacher',
    component: TeacherComponent,
  },
  {
    path: 'students',
    component: StudentComponent,
  },
  {
    path: 'program',
    component: ProgramComponent,
  },
  {
    path: 'batch',
    component: BatchComponent,
  },
  {
    path: 'marks',
    component: MarksComponent, 
  },
  {
    path: 'teacher-panel',
    loadChildren: () =>
      import('./components/teacher-panel/teacher-panel.module').then(
        (m) => m.TeacherPanelModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
