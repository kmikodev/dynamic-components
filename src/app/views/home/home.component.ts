import { TodoListComponent } from './../components/todo-list/todo-list.component';

import { RenderService } from './../../core/services/render.service';
import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  @ViewChild('componentContainer') componentContainer: ElementRef;

  constructor(
    private renderService: RenderService
  ) { }

  ngOnInit() {
  }

  loadComponent() {
    this.renderService.appendOwnComp(TodoListComponent, this.componentContainer.nativeElement);
  }

  loadComponentWithProperties() {
    const items = { items: ['uno', 'dos', 'tres'] };
    this.renderService.appendOwnComp(TodoListComponent, this.componentContainer.nativeElement, items);
  }
}
