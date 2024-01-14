import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { SailService } from './services/sail/sail.service';
import { AlertService } from './services/alert/alert.service';
import { LoginService } from './services/login/login.service';
import { Dates } from './dates/dates';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'sail'; 
  
  loginInfo:any;
  appComponentInfo:any;   
  services:any;
 
  handleDrawerOpen() {
    this.loginInfo.openMenu = true;
  }

  handleDrawerClose() {
    this.loginInfo.openMenu = false;
  }
 
  constructor(public dates:Dates) 
    { 
    this.services = dates.getServices(); 
    this.loginInfo = dates.loginInfo;
    this.appComponentInfo = dates.appComponentInfo; 
    this.appComponentInfo.form = this.services.formulario.group({
      user_name: [''], password: ['']
   });

   this.appComponentInfo.form_reg = this.services.formulario.group({
    user_name_reg: [''],
    password_reg: [''],
    userType_reg:[''],
    name_reg: [''],
    last_name_reg: [''],
    age_reg: [''], 
 });
  }

  ngOnInit(): void {  
    this.dates.getServices().alert.alertVisibility$.subscribe((message) => { 
      this.appComponentInfo.isAlertVisible = !!message;
  
      if (this.appComponentInfo.isAlertVisible) {
        setTimeout(() => {
          this.appComponentInfo.isAlertVisible = false; 
        }, 4000);
      }
    });

    this.loginInfo.isLogin = this.services.authService.isAuthenticated();

    this.loginInfo.userType = localStorage.getItem("userType") ?? "";

    if(localStorage.getItem("userLoggedIn")=="true") this.services.router.navigate(['/home']);
    else this.services.router.navigate(['']);
  }  

  updateUserName() {
    const usname = document.getElementById('login') as HTMLSelectElement;
    this.loginInfo.usName = usname.value;  
  }

  updatePassword() {
    const password = document.getElementById('password') as HTMLSelectElement;
    this.loginInfo.passw = password.value;
  }

  updateImage() {
    const tipous = document.getElementById('tipous') as HTMLSelectElement;
    console.log(tipous.value);
    this.loginInfo.userType = tipous.value;
  }

  toggleRegistro() {
    this.loginInfo.isRegistro = !this.loginInfo.isRegistro;
  }

  salir() {
    this.services.authService.logout();
    this.services.authService.logoutuserType();

    this.loginInfo.isRegistro =   this.services.authService.isAuthenticated();
    this.loginInfo.isLogin=  this.services.authService.isAuthenticated();
    this.loginInfo.userType =   this.services.authService.isUserType()?? "";
  }
  
  enviarDatos() { 
    this.dates.getServices().servicio.getVerify(this.appComponentInfo.form.value).subscribe(
      response => {
        console.log('Respuesta del servidor:', response); 
        
        if(response.result.length >0)
        {
          const firstUser = response.result[0];
          this.appComponentInfo.idUs= firstUser.id_us; 

          this.services.authService.login();
          this.loginInfo.isLogin=this.services.authService.isAuthenticated();
          this.services.authService.userType(this.loginInfo.userType);
          this.services.authService.idUs(this.appComponentInfo.idUs);
          this.getPerson();
          this.dates.getServices().router.navigate(['/home']);
        }
         else  
         {
          this.services.authService.logout(); 
          this.services.router.navigate(['']);
        } 
      },
      error => {
        console.error('Error en la solicitud:', error);
        this.services.router.navigate(['']);
      }
    );  
  }

  crearUs()
  {
    this.dates.getServices().servicio.createUs(this.appComponentInfo.form_reg.value).subscribe(
      response => {
        console.log('Respuesta del servidor:', response); 
        
        if(response.result.length >0)
        {
          const firstUser = response.result[0];
          this.appComponentInfo.idUs= firstUser.id_us; 

          this.services.authService.login();
          this.loginInfo.isLogin=this.dates.getServices().authService.isAuthenticated();
          this.services.authService.userType(this.loginInfo.userType);
          this.services.authService.idUs(this.appComponentInfo.idUs);
          this.getPerson();
          this.dates.getServices().router.navigate(['/home']);
        }
         else  
         {
          this.services.authService.logout(); 
          this.services.router.navigate(['']);
        } 
      },
      error => {
        console.error('Error en la solicitud:', error);
        this.services.router.navigate(['']);
      }
    );  
  }

  getPerson()
  {
    this.appComponentInfo.person= this.dates.getServices().servicio.getPerson(this.appComponentInfo.idUs).subscribe(
      response => { 
        const firstUser = response[0];
        this.appComponentInfo.idPerson = firstUser.id_person;
        this.services.authService.idPerson(this.appComponentInfo.idPerson); 

      },
      error => {
        console.error('Error en la solicitud:', error);
        this.services.router.navigate(['']);
      }
    );
  }
 
}
