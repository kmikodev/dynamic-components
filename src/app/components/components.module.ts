import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DrawZoneComponent } from './draw-zone/draw-zone.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [DrawZoneComponent],
  exports: [
    DrawZoneComponent
  ],
  entryComponents: [
    DrawZoneComponent
  ]
})
export class ComponentsModule { }
