import { DrawZoneComponent } from './../../components/draw-zone/draw-zone.component';
import { RenderService } from './../../core/services/render.service';
import { Component, OnInit, ViewChild, ElementRef, ViewContainerRef } from '@angular/core';

@Component({
  selector: 'app-external-module',
  templateUrl: './external-module.component.html',
  styleUrls: ['./external-module.component.scss']
})
export class ExternalModuleComponent implements OnInit {
  
 
  @ViewChild('componentContainer', {
    read: ViewContainerRef
  }) componentContainer: ViewContainerRef;

  private src = 'https://cdn.rawgit.com/kmikodev/contact-list/master/contact-list/bundles/contact-list.umd2.min.js';
  constructor(
    private renderService: RenderService
  ) { }

  ngOnInit() {
  }

  loadComponent() {
    this.renderService.appendRemoteComponent(this.src, 'contact-list', 'ContactListModule', this.componentContainer);
  }

}
