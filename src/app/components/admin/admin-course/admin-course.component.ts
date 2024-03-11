import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { SailService } from 'src/app/services/sail/sail.service';
  
@Component({
  selector: 'app-admin-course',
  templateUrl: './admin-course.component.html',
  styleUrls: ['./admin-course.component.css']
})

export class AdminCourseComponent implements OnInit {

  
  id_us: string | null = null;
  id_person: number | undefined;   
  pers: any;
  ready:any;

  //profesor
  teachsubject:any;
  teach:any;
  usteach:any;

  //
  todo:any;

  //cursos
  curs:any;
  asig:any;

  initialPersonID:any;
  form: FormGroup;
  

  constructor(   
    private formulario:FormBuilder,
    public servicio: SailService) {
       this.initialPersonID = parseInt(localStorage.getItem('personID') || '0', 10);
      this.form = this.formulario.group({
        user_name: [], name: [''] 
     });
       }

  ngOnInit(): void {
     this.id_us= localStorage.getItem("userID"); 
     
 
     this.servicio.getAllTeacher().subscribe(teach=>{
      this.teach=teach;
      
      this.servicio.getAllSubjectTeacher(this.teach).subscribe(id_teacher=>{
        this.teachsubject=id_teacher; 
        this.ready=true;
       });
     });
 

     this.servicio.getAllTeacher().subscribe(teach=>{
      this.teach=teach;
     });
 
    
     //CURSO-ASIGNATURA
     const cursosOrdenados = [{name: '8vo Grado'}, {name: '9no Grado'}, {name: '10mo Grado'}, {name: '1er Bachillerato'}, {name: '2do Bachillerato'}, {name: '3er Bachillerato'}];
     this.curs=cursosOrdenados; 
   

     this.servicio.getAllSubject().subscribe(asig=>{
      this.asig=asig;  
     });

     this.servicio.getSubjectOfTeacherOrder().subscribe(subj=>{
          this.todo= subj;
     });  

     this.servicio.getAllPersonTeacher().subscribe(pers=>{
      this.pers=pers;
      this.servicio.getAllUsTeacher(this.pers).subscribe(usteach=>{
        this.usteach=usteach.result;  
       }); 
     });  
   
  }

  onSelectChange(selectedValue: string, index: number): void { 
    this.asig[index].name = selectedValue;
  }

  getSelectOptions(index: number): string[] { 
    const startIndex = index * 5; 
    const endIndex = startIndex + 4;
    const options: string[] = [];
  
    for (let j = startIndex; j <= endIndex; j++) {
      options.push(`${this.asig[j].name}`);
    }
  
    return options;
  }

  onAcceptClick()
  { 
    this.servicio.asigTeacher(this.form.value).subscribe(
      response => {
        console.log('Respuesta del servidor:', response); 
        alert("PROFESOR ASIGNADO");
      },
      error => {
        console.error('Error en la solicitud:', error); 
      }
    );   
     this.ngOnInit(); 
  }

  onDeleteClick()
  {

  }
}
