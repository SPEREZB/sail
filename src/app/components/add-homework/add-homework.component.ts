import { Dates } from './../../dates/dates';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { SailService } from 'src/app/services/sail/sail.service';

@Component({
  selector: 'app-add-homework',
  templateUrl: './add-homework.component.html',
  styleUrls: ['./add-homework.component.css']
})
export class AddHomeworkComponent implements OnInit {

  mostrarForm = false;
  nombreActividad = '';
  descripcionActividad = '';
  tipoActividad = '';
  fechaLimite = '';
  form:FormGroup;
  id_subject:any;
 
  

  constructor(private servicio:SailService,
    private formulario:FormBuilder) 
    {
       this.form=this.formulario.group({
         name:[], description:[], type:[],
         date:[]
       }) 
     }

  ngOnInit(): void {
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


  mostrarFormulario(tipoActividad: string) {
    this.mostrarForm = true;
    this.tipoActividad = tipoActividad;
  }

  ocultarFormulario() {
    this.mostrarForm = false; 
    this.nombreActividad = '';
    this.descripcionActividad = '';
    this.tipoActividad = '';
    this.fechaLimite = '';

    this.id_subject= localStorage.getItem("subject");



    const formData = { ...this.form.getRawValue(), id_subject: this.id_subject };
 
    this.servicio.createActivity(formData).subscribe(act=>
      {
        alert("BIENN");
      });
  }

}
