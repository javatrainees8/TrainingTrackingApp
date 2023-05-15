import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from '../components/layout/layout.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconButton } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatCardModule } from '@angular/material/card';
import { RouterModule } from '@angular/router';
import { DragDropDirective } from './drag-drop.directive';



@NgModule({
  declarations: [
    LayoutComponent,
    DragDropDirective
  ],
  imports: [
    CommonModule,
    MatToolbarModule,
    MatIconModule,
    RouterModule,
    MatMenuModule,
    MatCardModule
  ],
  exports:[LayoutComponent,DragDropDirective]
})
export class SharedModule { }
