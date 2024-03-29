 
import { Component, OnInit } from '@angular/core'; 
import { SailService } from 'src/app/services/sail/sail.service';
import { Router } from '@angular/router';
import { Dates } from 'src/app/dates/dates';
import { ChatService } from 'src/app/services/chat/chat.service';

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
  id_teach:any;
  id_course:any;
  type:any;
  cursos: any[]=[];
  subj:any;
 

  constructor(private router:Router, 
    public servicio: SailService,dates:Dates,
    private servicefire: ChatService) {  
 

    this.loginInfo = dates.loginInfo;
    this.services = dates.getServices(); 
   }   

  ngOnInit(): void {
    this.type= localStorage.getItem("userType"); 
    this.id_teach= localStorage.getItem("teacherID");
    this.id_course= localStorage.getItem("courseID"); 
    if(this.id_course!="null")
    { 
    if(this.type=="profesor")
    {
      this.servicio.getSubjectOfTeacherById({ id_teacher: this.id_teach }).subscribe(subj=>{
        this.subj=subj; 
        this.loadImg();
       });
     
    }else
    {
      this.servicio.getSubjectOfStudent({ id_course: this.id_course }).subscribe(subj=>{
        this.subj=subj; 
        this.loadImg();
       }); 
    } 
  }else{

  }

  }

  loadImg(): void {
    this.servicefire
      .getImgByIds(this.subj)
      .subscribe((files) => { 
        this.cursos = files;
        this.downloadImg(this.cursos)
      });
  }

  downloadImg(cursos:any): void {
    this.servicefire.downloadImg(cursos).subscribe((urls: string[]) => { 
      console.log(urls); 
      this.cursos = urls;
    });
  }
  
  onItemClick(curso: any): void {
 
    this.services.authService.subject(this.subj);
    
    this.router.navigate(['profesor/cursos/actividades']);
  }

   materiaestudiante(curso: any, id:any): void { 
    this.services.authService.subject(this.subj[id].id_subject);
    this.router.navigate(['estudiante/cursos/realizar_deber']);
  }

  materiaprofesor(curso: any, id:any): void { 
    this.services.authService.subject(this.subj[id].id_subject);
    this.router.navigate(['profesor/cursos/actividades']);
  }
}
