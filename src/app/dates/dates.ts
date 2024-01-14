import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../services/login/login.service';
import { AlertService } from '../services/alert/alert.service';
import { SailService } from '../services/sail/sail.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
  export class Dates {
    constructor(
      public router: Router,
      private authService: LoginService,
      private formulario: FormBuilder,
      private alert: AlertService,
      public servicio: SailService
    ) {}
  
    getServices() {
      return {
        router: this.router,
        authService: this.authService,
        formulario: this.formulario,
        alert: this.alert,
        servicio: this.servicio,
      };
    }

    loginInfo = {
      userType: "",
      usName: "",
      passw: "",
      isRegistro: false,
      isLogin: false,
      openMenu: false,
    };
  
    appComponentInfo = {
      isAlertVisible: false,
      respuesta: "",
      person: null,   
      form: FormGroup,
      form_reg: FormGroup,
      idUs: 0,
      idPerson: 0,
    };  
  }