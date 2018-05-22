import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanetDataComponent } from './planet-data.component';

describe('PlanetDataComponent', () => {
  let component: PlanetDataComponent;
  let fixture: ComponentFixture<PlanetDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlanetDataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlanetDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
