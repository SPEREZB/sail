import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor() { } 

  private alertSubject = new BehaviorSubject<string>('');
  alert$ = this.alertSubject.asObservable();

  private alertVisibilitySubject = new BehaviorSubject<boolean>(false);
  alertVisibility$ = this.alertVisibilitySubject.asObservable();

  showAlert(message: string) {
    this.alertSubject.next(message);
  }

  setAlertVisibility(isVisible: boolean) {
    this.alertVisibilitySubject.next(isVisible);
  }
}
