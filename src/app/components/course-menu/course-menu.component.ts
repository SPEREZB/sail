 
import { Component, OnInit } from '@angular/core'; 
import { SailService } from 'src/app/services/sail/sail.service';
import { Router } from '@angular/router';
import { Dates } from 'src/app/dates/dates';

interface UserProfile {
  id_us: number;
  user_name: string;
  password: string;
  type?: boolean;
  id_person: number;
}

interface PersonProfile {
  name?: string;
  last_name?: string;
  age?: number;
}

@Component({
  selector: 'app-course-menu',  
  templateUrl: './course-menu.component.html', 
  styleUrls: ['./course-menu.component.css']
})
export class CourseMenuComponent implements OnInit { 
  profilePicturePath = 'path/to/profile.jpg';  
  editarImagePath = 'path/to/editar.jpg';  
  eliminarImagePath = 'path/to/eliminar.jpg';  

  userData: UserProfile[] = [];
  personData: PersonProfile[] = [];
  id_person: number | undefined; 
  loginInfo:any;
  services:any;

  id_us: any;
  type:any;
  cursos: any[]=[];
  subj:any;
 

  constructor(private router:Router, 
    public servicio: SailService,dates:Dates) {  
     this.cursos = [
      { id: 1, nombre: 'Matemáticas', icono: './../../../assets/course/mate.png' },
      { id: 2, nombre: 'Historia', icono: './../../../assets/course/historia.png' },
      { id: 3, nombre: 'Informactica', icono: './../../../assets/course/informatica.png' },
      { id: 4, nombre: 'Ciencias', icono: './../../../assets/course/ciencias.png' },
    ];

    this.loginInfo = dates.loginInfo;
    this.services = dates.getServices(); 
   }   

  ngOnInit(): void {
    this.type= localStorage.getItem("userType");
    this.id_us= localStorage.getItem("userID");  
    
    this.servicio.getSubjectTeacher({ id_us: this.id_us }).subscribe(subj=>{
      this.subj=subj; 
     });

  }
  
  onItemClick(curso: any): void {
 
    this.services.authService.subject(this.subj);
    
    this.router.navigate(['profesor/cursos/actividades']);
  }

   materia1(curso: any): void { 
    this.services.authService.subject(this.subj[0].id_subject);
    this.router.navigate(['profesor/cursos/actividades']);
  }

  materia2(curso: any): void { 
    this.services.authService.subject(this.subj[0].id_subject);
    this.router.navigate(['profesor/cursos/actividades']);
  }
}
