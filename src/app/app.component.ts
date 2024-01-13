import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { SailService } from './services/sail/sail.service';
import { AlertService } from './services/alert/alert.service';
import { LoginService } from './services/login/login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'sail'; 

  //VARIABLES PARA EL LOGIN 
  userType:any="";
  usName:any ="";
  passw:any ="";
  isRegistro: boolean = false; 
  isLogin: boolean = false; 
  openMenu: boolean = false; 

  //ALERT
  isAlertVisible: boolean = false;

  //VARIABLES PARA LOS SERVICIOS
  respuesta:any=""; 
  person:any="";
  form: FormGroup;   
  idUs:any=0;
  idPerson:any=0;
 
 
  handleDrawerOpen() {
    this.openMenu = true;
  }

  handleDrawerClose() {
    this.openMenu = false;
  }
 
  constructor(private router: Router,  
    private authService: LoginService,
    public formulario:FormBuilder,
    public alert:AlertService,
    public servicio:SailService ) {
    this.form = this.formulario.group({
      user_name: [''], password: ['']
   });
  }

  ngOnInit(): void {
    this.alert.alertVisibility$.subscribe((message) => { 
      this.isAlertVisible = !!message;
  
      if (this.isAlertVisible) {
        setTimeout(() => {
          this.isAlertVisible = false; 
        }, 4000);
      }
    });

    this.isLogin = this.authService.isAuthenticated();

    this.userType= localStorage.getItem("userType");

    if(localStorage.getItem("userLoggedIn")=="true") this.router.navigate(['/home']);
    else this.router.navigate(['']);
  }  

  updateUserName() {
    const usname = document.getElementById('login') as HTMLSelectElement;
    this.usName = usname.value;  
  }

  updatePassword() {
    const password = document.getElementById('password') as HTMLSelectElement;
    this.passw = password.value;
  }

  updateImage() {
    const tipous = document.getElementById('tipous') as HTMLSelectElement;
    console.log(tipous.value);
    this.userType = tipous.value;
  }

  toggleRegistro() {
    this.isRegistro = !this.isRegistro;
  }

  salir() {
    this.authService.logout();
    this.authService.logoutuserType();

    this.isRegistro = this.authService.isAuthenticated();
    this.isLogin=this.authService.isAuthenticated();
    this.userType= this.authService.isUserType();
  }
  
  enviarDatos() { 
    this.respuesta= this.servicio.getUs(this.form.value).subscribe(
      response => {
        console.log('Respuesta del servidor:', response); 
        
        if(response.result.length >0)
        {
          const firstUser = response.result[0];
          this.idUs= firstUser.id_us; 

          this.authService.login();
          this.isLogin=this.authService.isAuthenticated();
          this.authService.userType(this.userType);
          this.authService.idUs(this.idUs);
          this.getPerson();
          this.router.navigate(['/home']);
        }
         else  
         {
          this.authService.logout(); 
          this.router.navigate(['']);
        }


      },
      error => {
        console.error('Error en la solicitud:', error);
        this.router.navigate(['']);
      }
    ); 
    
    
  
  }

  getPerson()
  {
    this.person= this.servicio.getIDPerson(this.idUs).subscribe(
      response => { 
        const firstUser = response.result[0];
        this.idPerson = firstUser.id_person;
        this.authService.idPerson(this.idPerson); 

      },
      error => {
        console.error('Error en la solicitud:', error);
        this.router.navigate(['']);
      }
    );
  }
 
}
