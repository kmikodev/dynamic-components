import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExternalModuleComponent } from './external-module.component';

describe('ExternalModuleComponent', () => {
  let component: ExternalModuleComponent;
  let fixture: ComponentFixture<ExternalModuleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExternalModuleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExternalModuleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
