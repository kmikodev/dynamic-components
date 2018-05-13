import { ReactiveFormsModule } from '@angular/forms';
import { TodoListComponent } from './components/todo-list/todo-list.component';
import { SharedModule } from './../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
  ],
  declarations: [
    HomeComponent,
    TodoListComponent
  ],
  exports: [
    HomeComponent
  ],
  entryComponents: [
    TodoListComponent
  ]
})
export class ViewsModule { }
