import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit {

  public addForm: FormGroup;
  public items: String[] = [];
  constructor() { }

  ngOnInit() {
    this.createForm();
  }

  private createForm() {
    this.addForm = new FormGroup({
      'newItem': new FormControl('', [Validators.required])
    });
  }

  addItem() {
    this.items.push(this.addForm.controls.newItem.value)
    this.addForm.reset();
  }

}
