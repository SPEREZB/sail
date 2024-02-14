import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ChatService } from 'src/app/services/chat/chat.service';
import { SailService } from 'src/app/services/sail/sail.service';

@Component({
  selector: 'app-review-notes',
  templateUrl: './review-notes.component.html',
  styleUrls: ['./review-notes.component.css']
})
export class ReviewNotesComponent implements OnInit {

  mostrarForm = false; 
  form:FormGroup;
  id_activites:any;
  id_subject:any; 
  id_student:any;
  activ:any;
  selectedFile:any;
  file: any;
 
  activities: any = {
    deberes: [],
    actividadesClases: [],
    examenes: []
  };

  constructor(private servicio:SailService,
    private formulario:FormBuilder, 
    private servicefire: ChatService) 
    {
       this.form=this.formulario.group({
         id_activities:[], name:[], description:[], 
         type:[],date:[], archivo:[]
       })  
 
     }

     ngOnInit(): void {
      this.id_subject= localStorage.getItem("subject");   
      this.servicio.getActivityStudent(this.id_subject).subscribe(activ=>{
        this.activ=activ; 
  
        this.activities.deberes = activ.filter((activity: { type: string; }) => activity.type === 'DEBER');
        this.activities.actividadesClases = activ.filter((activity: { type: string; }) => activity.type === 'TALLER EN CLASES');
        this.activities.examenes = activ.filter((activity: { type: string; }) => activity.type === 'EXAMEN');
    
       });

      this.servicio.getAllStudentofCoursebySubject(this.id_subject).subscribe(idst=>{
        this.id_student=idst;  
        this.loadFiles();
       });
    }

    loadFiles(): void {
      this.servicefire
        .getFilesByIds(this.id_student, this.activ)
        .subscribe((files) => {
          this.file = files;
        });
    }
  
    descargarArchivo(archivo: string): void {
      this.servicefire.downloadFile(archivo);
    }


  expandRectangle(id: string): void {
    const rectangle = document.getElementById(id);
  
    if (rectangle instanceof HTMLElement) {
      rectangle.classList.toggle('expanded');
  
      const content = rectangle.querySelector('.content');
  
      if (content instanceof HTMLElement) {
        if (rectangle.classList.contains('expanded')) {
          content.style.display = 'block';
        } else {
          content.style.display = 'none';
        }
      }
    }
  }


  mostrarFormulario(actividad: any) {
    this.mostrarForm = true;  
    this.form.get('name')?.setValue(actividad.name);
    this.form.get('description')?.setValue(actividad.description);
    this.form.get('type')?.setValue(actividad.type);
    this.form.get('date')?.setValue(actividad.date);

    this.form.get('name')?.disable();
    this.form.get('description')?.disable();
    this.form.get('type')?.disable();
    this.form.get('date')?.disable();
  }

}
