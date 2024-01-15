import { Component, OnInit } from '@angular/core';
import { Dates } from 'src/app/dates/dates';
import { CargarscripsService } from 'src/app/services/cargarscrips/cargarscrips.service';

@Component({
  selector: 'app-perfilestudiante',
  templateUrl: './perfilestudiante.component.html',
  styleUrls: ['./perfilestudiante.component.css']
})
export class PerfilestudianteComponent {
  
  constructor(private _CargarScripts: CargarscripsService,
    dates:Dates) { 
    this.services = dates.getServices(); 
    this.loginInfo = dates.loginInfo;
    this.appComponentInfo = dates.appComponentInfo; 

    _CargarScripts.scripdashboard(["scripdashboard"]);
  }

  loginInfo:any;
  appComponentInfo:any;   
  services:any;
 

  salir() {
    this.services.authService.logout();
    this.services.authService.logoutuserType();

    this.loginInfo.isRegistro =   this.services.authService.isAuthenticated();
    this.loginInfo.isLogin=  this.services.authService.isAuthenticated();
    this.loginInfo.userType =   this.services.authService.isUserType()?? "";
  }
}
