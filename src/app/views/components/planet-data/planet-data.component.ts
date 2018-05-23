import { LocationService } from './../../../shared/services/location.service';
import { Component, OnInit, ViewEncapsulation, Input } from '@angular/core';


@Component({
  selector: 'app-planet-data',
  templateUrl: './planet-data.component.html',
  styleUrls: ['./planet-data.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PlanetDataComponent implements OnInit {

  public planet: any;
  @Input() plannetName;
  constructor(
    private locationService: LocationService
  ) { }

  ngOnInit() {
    this.locationService.locationChanges().subscribe(
      (changeLocation) => {
        this.findLocation();
      }
    )
    this.findLocation();

  }

  async findLocation() {
    this.planet = await this.locationService.getLocation(this.locationService.currentLocation);
  }
}
