import { Injectable, InjectionToken } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WindowService {
  get window(): any {
    return window;
  }
}
