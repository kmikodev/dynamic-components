import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DrawZoneComponent } from './draw-zone.component';

describe('DrawZoneComponent', () => {
  let component: DrawZoneComponent;
  let fixture: ComponentFixture<DrawZoneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DrawZoneComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DrawZoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
