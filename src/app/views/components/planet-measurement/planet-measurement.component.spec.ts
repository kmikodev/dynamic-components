import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanetMeasurementComponent } from './planet-measurement.component';

describe('PlanetMeasurementComponent', () => {
  let component: PlanetMeasurementComponent;
  let fixture: ComponentFixture<PlanetMeasurementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlanetMeasurementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlanetMeasurementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
