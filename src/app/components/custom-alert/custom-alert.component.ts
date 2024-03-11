import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AppComponent } from 'src/app/app.component';
import { AlertService } from 'src/app/services/alert/alert.service';

@Component({
  selector: 'app-custom-alert',
  template: `
    <div *ngIf="isVisible" class="custom-alert" [ngClass]="{'success': isSuccess, 'error': !isSuccess}">
      {{ message }}
    </div>
  `,
  styles: [`
    .overlay {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;  
      align-items: center;
      justify-content: center; 
    }
    .custom-alert {
      position: fixed;
      top: 2%;
      left: 50%; 
      transform: translateX(-50%);
      padding: 10px;
      border-radius: 5px;
      color: #fff;
      width: 300px;
      text-align: center; 
    }

    .success {
      background-color: green;
    }

    .error {
      background-color: red;
    }
  `]
})
export class CustomAlertComponent implements OnInit { 
  message: string = '';
  fondo:boolean=false;
  isVisible: boolean = false;
  isSuccess: boolean = true;

  constructor(private alertService: AlertService) {}

  ngOnInit() {
    this.alertService.alert$.subscribe((message) => {
      this.message = message;

      if(message=="¡DESAFIO COMPLETADO EXITOSAMENTE!" || message=="¡REGISTRO EXISTOSO, POR FAVOR CONTACTESE CON LA AUTIRDAD DEL COLEGIO PARA SER ASIGNADO A UN CURSO!") this.isSuccess=true;
      else this.isSuccess=false;
      this.isVisible = !!message;
      this.cambiarFondo();
      if (this.isVisible) {
        setTimeout(() => {
          this.isVisible = false; 
        }, 5000);
      }
    });  
  }

  cambiarFondo() {
    this.alertService.setAlertVisibility(this.isVisible);
  }

}
