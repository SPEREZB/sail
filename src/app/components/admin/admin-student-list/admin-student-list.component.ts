import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { SailService } from 'src/app/services/sail/sail.service';

@Component({
  selector: 'app-admin-student-list',
  templateUrl: './admin-student-list.component.html',
  styleUrls: ['./admin-student-list.component.css']
})
export class AdminStudentListComponent implements OnInit {

  id_us: string | null = null;
  id_person: number | undefined;  
  us: any;
  pers: any; 
  student:any;
  course:any;
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

     this.servicio.getAllPersonStudent().subscribe(pers=>{
      this.pers=pers;

      this.servicio.getAllUsOrder(this.pers).subscribe(us=>{
        this.us=us;
       }); 
     }); 

     this.servicio.getAllStudent().subscribe(st=>{
      this.student=st; 

      this.servicio.getAllCourseOrder(this.student).subscribe(cor=>{
        this.course=cor;
       }); 
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
