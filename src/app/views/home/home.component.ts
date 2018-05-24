import { DrawZoneComponent } from './../../components/draw-zone/draw-zone.component';
import { PlanetMeasurementComponent } from './../components/planet-measurement/planet-measurement.component';
import { PlanetDataComponent } from './../components/planet-data/planet-data.component';
import { LocationService } from './../../shared/services/location.service';
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
  public locate: any;
  private dynamics: any[] = [];

  constructor(
    private renderService: RenderService,
    private locationService: LocationService
  ) { }

  async ngOnInit() {
    const locations = await this.locationService.getLocations();
    this.locate = locations[0];
    this.locationService.currentLocation = this.locate.key;
  }

  loadPlanetData() {
    const p = this.dynamics.find(p => p === 'PlanetDataComponent');
    debugger
    if (!p) {
      this.renderService.appendComponent(PlanetDataComponent, this.componentContainer.nativeElement);
      this.dynamics.push('PlanetDataComponent');
    }
  }

  loadMeasurent() {
    const p = this.dynamics.find(p => p === 'PlanetMeasurementComponent');
    if (!p) {
      this.renderService.appendComponent(PlanetMeasurementComponent, this.componentContainer.nativeElement);
      this.dynamics.push('PlanetMeasurementComponent');
    }
  }

  loadTodoList() {
    const p = this.dynamics.find(p => p === 'TodoListComponent');
    if (!p) {
      const items = { items: ['Bucar alimento', 'Hablar con el jefe del planeta', 'Molestar a Morty'] };
      this.renderService.appendComponent(TodoListComponent, this.componentContainer.nativeElement, items);
      this.dynamics.push('TodoListComponent');
    }
  }

  loadSigned() {
    const p = this.dynamics.find(p => p === 'DrawZoneComponent');
    if (!p) {
      this.renderService.appendComponent(DrawZoneComponent, this.componentContainer.nativeElement);
      this.dynamics.push('DrawZoneComponent');
      
    }
  }
}
