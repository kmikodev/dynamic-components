import { GuardGuard } from './guard.guard';
import { RenderService } from './services/render.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [],
  providers:[
    RenderService,
    GuardGuard
  ]
})
export class CoreModule { }
