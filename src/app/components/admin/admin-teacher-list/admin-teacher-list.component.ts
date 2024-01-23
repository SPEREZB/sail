import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { SailService } from 'src/app/services/sail/sail.service';

@Component({
  selector: 'app-admin-teacher-list',
  templateUrl: './admin-teacher-list.component.html',
  styleUrls: ['./admin-teacher-list.component.css']
})
export class AdminTeacherListComponent implements OnInit {

 
  id_us: string | null = null;
  id_person: number | undefined;  
  us: any;
  pers: any;
  teach:any;
  initialPersonID:any;
  form: FormGroup;
  

  constructor(   
    private formulario:FormBuilder,
    public servicio: SailService) {
       this.initialPersonID = parseInt(localStorage.getItem('personID') || '0', 10);
      this.form = this.formulario.group({
        id_person: [], name: [''], last_name: [''],age: []
     });
       }

  ngOnInit(): void {
     this.id_us= localStorage.getItem("userID"); 
     
     this.servicio.getAllTeacher().subscribe(teach=>{
      this.teach=teach;
     });

     this.servicio.getAllUs().subscribe(us=>{
      this.us=us;
     });

     this.servicio.getAllPersonTeacher().subscribe(pers=>{
      this.pers=pers;
     });
  
  }

  onAcceptClick()
  { 
    this.form.patchValue({ id_person: this.initialPersonID  }); 

    const formData = this.form.getRawValue();
    this.servicio.updateUs(formData).subscribe(respuesta=>{
      alert(respuesta.message)
    });  
  }

  onDeleteClick()
  {

  }

}
