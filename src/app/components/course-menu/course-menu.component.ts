 
import { Component, OnInit } from '@angular/core'; 

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

  cursos: any[]=[];

  constructor() {  
     this.cursos = [
      { id: 1, nombre: 'Matemáticas', icono: './../../../assets/course/mate.png' },
      { id: 2, nombre: 'Deportes', icono: './../../../assets/course/deportes.png' },
      { id: 3, nombre: 'Informática', icono: './../../../assets/course/informatica.png' },
      { id: 4, nombre: 'Ciencias', icono: './../../../assets/course/ciencias.png' },
    ];
   }   

  ngOnInit(): void {
    
  }
  
  onItemClick(curso: any): void {
    console.log('Item clicked:', curso);
 
  }
}
