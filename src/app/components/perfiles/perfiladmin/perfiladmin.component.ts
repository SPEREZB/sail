import { Component } from '@angular/core';
import { CargarscripsService } from '../../../services/cargarscrips/cargarscrips.service';
import { Dates } from 'src/app/dates/dates';
@Component({
  selector: 'app-perfiladmin',
  templateUrl: './perfiladmin.component.html',
  styleUrls: ['./perfiladmin.component.css']
})
export class PerfiladminComponent {

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
