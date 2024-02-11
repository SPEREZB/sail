import { Component, HostListener  } from '@angular/core'; 
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
    academic_degree_reg: [''], 
    specialization_reg: [''],
    work_experience_reg: ['']
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

    if(localStorage.getItem("userLoggedIn")=="true")
     {
      if(localStorage.getItem("userType")=="admin") this.services.router.navigate(['/admin']);
      else if(localStorage.getItem("userType")=="profesor") this.services.router.navigate(['/profesor']);
      else    this.services.router.navigate(['/estudiante']); 
     }
     
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
      {
      next: (response)  => {
        console.log('Respuesta del servidor:', response); 
        
        if(response.result.length >0)
        {
          const firstUser = response.result[0];
          this.appComponentInfo.idUs= firstUser.id_us; 
          this.appComponentInfo.idPerson= firstUser.id_person;

          this.dates.getServices().servicio.getPersonTeacher(this.appComponentInfo.idPerson).subscribe(resteacher=>{
              this.appComponentInfo.idTeacher=resteacher[0].id_teacher;  
              this.services.authService.idTeacher(this.appComponentInfo.idTeacher);  
            });

          this.dates.getServices().servicio.getPersonStudent(this.appComponentInfo.idPerson).subscribe(resstudent=>{
              this.appComponentInfo.idStudent=resstudent[0].id_student; 
              this.services.authService.idStudent(this.appComponentInfo.idStudent);

              this.dates.getServices().servicio.getCourseStudentById(this.appComponentInfo.idStudent).subscribe(restcourse=>{
                this.appComponentInfo.idCourse=restcourse[0].id_course; 
                this.services.authService.idCourse(this.appComponentInfo.idCourse);
              });
            });

          this.services.authService.login();
          this.loginInfo.isLogin=this.services.authService.isAuthenticated();
          this.services.authService.userType(this.loginInfo.userType);
          this.services.authService.idUs(this.appComponentInfo.idUs);
          this.services.authService.idPerson(this.appComponentInfo.idPerson); 

          if(this.loginInfo.userType=="admin") this.dates.getServices().router.navigate(['/admin']);
          else if(this.loginInfo.userType=="profesor") this.dates.getServices().router.navigate(['/profesor']);
          else this.dates.getServices().router.navigate(['/estudiante']);
        }
         else  
         {
          this.services.authService.logout(); 
          this.services.router.navigate(['']);
        } 
      },
      error: (error) => {
        console.error('Error en la solicitud:', error);
        this.services.router.navigate(['']);
      }
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
          this.appComponentInfo.idPerson= firstUser.id_person; 

          this.services.authService.login();
          this.loginInfo.isLogin=this.dates.getServices().authService.isAuthenticated();
          this.services.authService.userType(this.loginInfo.userType);
          this.services.authService.idUs(this.appComponentInfo.idUs);
       
          this.dates.getServices().router.navigate(['/estudiante']);
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
 
   
}
