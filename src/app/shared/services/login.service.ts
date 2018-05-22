import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }
  public async login(model: { username: string, password: string }) {
    const user = await this.http.get('api/login').toPromise();
    return user;
  }
}
