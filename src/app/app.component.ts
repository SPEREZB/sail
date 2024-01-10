import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { SailService } from './servicios/sail.service';
import { AlertService } from './servicios/alert.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'sail'; 
  userType:any="";
  isRegistro: boolean = false; 
  isLogin: boolean = false; 
  isAlertVisible: boolean = false;
  respuesta:any=""; 
  form: FormGroup; 
  fondo:boolean=false;
  openMenu: boolean = false;
  isVisible: boolean = false;
 
 
  handleDrawerOpen() {
    this.openMenu = true;
  }

  handleDrawerClose() {
    this.openMenu = false;
  }

    
 

  constructor(private router: Router,  
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
  }

  updateImage() {
    const tipous = document.getElementById('tipous') as HTMLSelectElement;
    this.userType = tipous.value;
  }

  toggleRegistro() {
    this.isRegistro = !this.isRegistro;
  }

  salir() {
    this.isRegistro = false;
    this.isLogin=false;
  }
  enviarDatos() { 
    this.respuesta= this.servicio.getUs(this.form.value).subscribe(
      response => {
        console.log('Respuesta del servidor:', response); 
        if(response.result.length >0)
        {
          this.isLogin=true;
          this.router.navigate(['/home']);
        }
         else  this.router.navigate(['/']);

      },
      error => {
        console.error('Error en la solicitud:', error);
        this.router.navigate(['/']);
      }
    ); 
}
 
}
