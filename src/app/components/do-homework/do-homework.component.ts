 
import { Component, OnInit } from '@angular/core'; 
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { FormBuilder, FormGroup } from '@angular/forms'; 
import { ChatService } from 'src/app/services/chat/chat.service';
import { SailService } from 'src/app/services/sail/sail.service';

@Component({
  selector: 'app-do-homework',
  templateUrl: './do-homework.component.html',
  styleUrls: ['./do-homework.component.css']
})
export class DoHomeworkComponent implements OnInit {

  mostrarForm = false; 
  form:FormGroup;
  id_activites:any;
  id_subject:any; 
  id_student:any;
  activ:any;
  selectedFile:any;
  file: string = '';
 
  activities: any = {
    deberes: [],
    actividadesClases: [],
    examenes: []
  };

  constructor(private servicio:SailService,
    private formulario:FormBuilder,
    private storage: AngularFireStorage,
    private servicefire: ChatService) 
    {
       this.form=this.formulario.group({
         id_activities:[], name:[], description:[], 
         type:[],date:[], archivo:[]
       }) 
     }

  ngOnInit(): void {
    this.id_subject= localStorage.getItem("subject");
    this.id_student= localStorage.getItem("studentID");

    this.servicio.getActivityStudent(this.id_subject).subscribe(activ=>{
      this.activ=activ; 

      this.activities.deberes = activ.filter((activity: { type: string; }) => activity.type === 'DEBER');
      this.activities.actividadesClases = activ.filter((activity: { type: string; }) => activity.type === 'TALLER EN CLASES');
      this.activities.examenes = activ.filter((activity: { type: string; }) => activity.type === 'EXAMEN');
  
     });
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
    this.id_activites=actividad.id_activities;
    this.form.get('name')?.setValue(actividad.name);
    this.form.get('description')?.setValue(actividad.description);
    this.form.get('type')?.setValue(actividad.type);
    this.form.get('date')?.setValue(actividad.date);

    this.form.get('name')?.disable();
    this.form.get('description')?.disable();
    this.form.get('type')?.disable();
    this.form.get('date')?.disable();
  }
 
 
  updateFileName(event: any): void {
    const fileName = event.target.files[0].name; 
    this.file = fileName;

    this.selectedFile = event.target.files[0];  
  }
  
  saveFile(): void {
    this.mostrarForm = false;
 
      this.servicefire.saveFileInStorage(this.selectedFile, this.id_student, this.id_activites)
        .subscribe(
          progress => {
            console.log(`Progreso de carga: ${progress}%`);
          },
          error => {
            console.error('Error durante la carga del archivo:', error);
          },
          () => {
            console.log('Archivo cargado exitosamente en Firebase Storage');
          }
        ); 
  }

}
