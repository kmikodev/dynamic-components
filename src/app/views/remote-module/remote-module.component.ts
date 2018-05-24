import { MocksService } from './../../shared/services/mocks.service';
import { RenderService } from './../../core/services/render.service';
import { Component, OnInit, ViewChild, ElementRef, ViewContainerRef } from '@angular/core';

@Component({
  selector: 'app-remote-module',
  templateUrl: './remote-module.component.html',
  styleUrls: ['./remote-module.component.scss']
})
export class RemoteModuleComponent implements OnInit {
 
  @ViewChild('componentContainer', {
    read: ViewContainerRef
  }) componentContainer: ViewContainerRef;
  

  private src = 'https://cdn.rawgit.com/kmikodev/contact-list/master/contact-list/bundles/contact-list.umd2.min.js';
  constructor(
    private renderService: RenderService,
    private mocksService: MocksService
  ) { }

  ngOnInit() {
  }

  loadComponent() {
    this.renderService.appendRemoteComponent(this.src, 'contact-list', 'ContactListModule', this.componentContainer);
  }

  async loadComponentWithProperties() {
    const contacts = await this.mocksService.getContacts();
    this.renderService.appendRemoteComponent(this.src, 'contact-list', 'ContactListModule', this.componentContainer, { contacts: contacts });
  }

}
