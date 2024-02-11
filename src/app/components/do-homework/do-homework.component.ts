import { Component, OnInit } from '@angular/core'; 
import { FormBuilder, FormGroup } from '@angular/forms';
import { SailService } from 'src/app/services/sail/sail.service';

@Component({
  selector: 'app-do-homework',
  templateUrl: './do-homework.component.html',
  styleUrls: ['./do-homework.component.css']
})
export class DoHomeworkComponent implements OnInit {

  mostrarForm = false;
  nombreActividad = '';
  descripcionActividad = '';
  tipoActividad = '';
  fechaLimite = '';
  form:FormGroup;
  id_subject:any; 
  subj:any;
 
  activities: any = {
    deberes: [],
    actividadesClases: [],
    examenes: []
  };

  constructor(private servicio:SailService,
    private formulario:FormBuilder) 
    {
       this.form=this.formulario.group({
         name:[], description:[], type:[],
         date:[]
       }) 
     }

  ngOnInit(): void {
    this.id_subject= localStorage.getItem("subject");

    this.servicio.getActivityStudent(this.id_subject).subscribe(subj=>{
      this.subj=subj; 

      this.activities.deberes = subj.filter((activity: { type: string; }) => activity.type === 'DEBER');
      this.activities.actividadesClases = subj.filter((activity: { type: string; }) => activity.type === 'TALLER EN CLASES');
      this.activities.examenes = subj.filter((activity: { type: string; }) => activity.type === 'EXAMEN');
  
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
    this.form.get('name')?.setValue(actividad.name);
    this.form.get('description')?.setValue(actividad.description);
    this.form.get('type')?.setValue(actividad.type);
    this.form.get('date')?.setValue(actividad.date);
    this.form.get('type')?.disable();
  }

  ocultarFormulario() {
    this.mostrarForm = false; 
    this.nombreActividad = '';
    this.descripcionActividad = '';
    this.tipoActividad = '';
    this.fechaLimite = '';

    this.id_subject= localStorage.getItem("subject");



    const formData = { ...this.form.getRawValue(), id_subject: this.id_subject };
 
    this.servicio.createActivity(formData).subscribe(
      (response) => {
        if (response.success) {
          alert('Actividad creada con éxito');
        } else {
          alert('Error: ' + response.error);
        }
      },
      (error) => {
        console.error('Error en la solicitud:', error);
        alert('Hubo un problema al procesar la solicitud. Por favor, inténtelo de nuevo.');
      }
    );
  }

}
