import { ViewsRoutingModule } from './views-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { TodoListComponent } from './components/todo-list/todo-list.component';
import { SharedModule } from './../shared/shared.module';
import { NgModule , NO_ERRORS_SCHEMA } from '@angular/core';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { ExternalModuleComponent } from './external-module/external-module.component';
import { MatNavbarComponent } from './components/mat-navbar/mat-navbar.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { PlanetDataComponent } from './components/planet-data/planet-data.component';
import { PlanetMeasurementComponent } from './components/planet-measurement/planet-measurement.component';
@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    ViewsRoutingModule,
    FlexLayoutModule,
    MDBBootstrapModule.forRoot()
    
  ],
  declarations: [
    HomeComponent,
    TodoListComponent,
    ExternalModuleComponent,
    MatNavbarComponent,
    PlanetDataComponent,
    PlanetMeasurementComponent
  ],
  exports: [
    HomeComponent
  ],
  entryComponents: [
    TodoListComponent,
    PlanetDataComponent,
    PlanetMeasurementComponent
  ],
  schemas: [ NO_ERRORS_SCHEMA ]
  
})
export class ViewsModule { }
