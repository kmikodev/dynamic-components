import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocationService {
  public currentLocation:any;
  private location: Subject<string> = new Subject<string>();
  constructor(
    private http: HttpClient
  ) { }

  changeLocation(location: string) {
    this.currentLocation = location;
    this.location.next(location);
  }

  locationChanges() {
    return this.location;
  }

  async getLocations() {
    const locations = await this.http.get('api/planets').toPromise();
    return locations;
  }

  async getLocation(name: string) {
    const locations = await this.http.get('api/planets').toPromise();
    return (locations as any).find(p => p.key === name);
  }
}
