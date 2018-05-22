import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MocksService {

  constructor(
    private http: HttpClient    
  ) { }

  async getMeasurements() {
    const measurements = await this.http.get('api/measurements').toPromise();
    return measurements;
  }

  async getMeasurement(symbol: string) {
    const measurements = await this.http.get('api/measurements').toPromise();
    return (measurements as any).find(p => p.symbol === symbol);
  }
  async getContacts() {
    const contacts = await this.http.get('api/contacts').toPromise();
    return contacts;
  }
}
