import { MocksService } from './../../shared/services/mocks.service';
import { RenderService } from './../../core/services/render.service';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-remote-module',
  templateUrl: './remote-module.component.html',
  styleUrls: ['./remote-module.component.scss']
})
export class RemoteModuleComponent implements OnInit {
  @ViewChild('componentContainer') componentContainer: ElementRef;
  private src = 'https://cdn.rawgit.com/kmikodev/contact-list/master/contact-list/bundles/contact-list.umd2.min.js';
  constructor(
    private renderService: RenderService,
    private mocksService: MocksService
  ) { }

  ngOnInit() {
  }

  loadComponent() {
    this.renderService.appendRemoteComp(this.src, 'contact-list', 'ContactListModule', this.componentContainer.nativeElement);
  }

  async loadComponentWithProperties() {
    const contacts = await this.mocksService.getContacts();
    this.renderService.appendRemoteComp(this.src, 'contact-list', 'ContactListModule', this.componentContainer.nativeElement, { contacts: contacts });
  }

}
