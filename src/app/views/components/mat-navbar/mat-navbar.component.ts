import { LocationService } from './../../../shared/services/location.service';
import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { Observable } from 'rxjs';

@Component({
  selector: 'mat-navbar',
  templateUrl: './mat-navbar.component.html',
  styleUrls: ['./mat-navbar.component.scss']
})
export class MatNavbarComponent implements OnInit {
  isHandset: Observable<BreakpointState> = this.breakpointObserver.observe(Breakpoints.Handset);
  constructor(
    private breakpointObserver: BreakpointObserver,
    private locationService: LocationService
  ) { }
  ngOnInit() {

  }
  changeLocation(location: string) {
    this.locationService.changeLocation(location);
  }
}
