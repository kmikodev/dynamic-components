import { DrawZoneComponent } from './../../components/draw-zone/draw-zone.component';
import { RenderService } from './../../core/services/render.service';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-external-module',
  templateUrl: './external-module.component.html',
  styleUrls: ['./external-module.component.scss']
})
export class ExternalModuleComponent implements OnInit {
  @ViewChild('componentContainer') componentContainer: ElementRef;
  
    constructor(
      private renderService: RenderService
    ) { }
  
    ngOnInit() {
    }
    
    loadExternalModuleComponent() {
      this.renderService.appendOwnComp(DrawZoneComponent, this.componentContainer.nativeElement);
    }
  }
  