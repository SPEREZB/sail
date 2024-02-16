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
  id_person: string | null = null;
  ready:any;
  us: any;
  pers: any; 
  student:any;
  course:any;
  initialPersonID:any;
  form: FormGroup;



  displayedPers: any[] = [];
  startIndex = 0;
  rowsPerPage = 6;
  

  constructor(   
    private formulario:FormBuilder,
    public servicio: SailService) {
       this.initialPersonID = parseInt(localStorage.getItem('personID') || '0', 10);
      this.form = this.formulario.group({
      id_person: [],
      name: [''],
      last_name: [''],
      age: [], 
      user_name: [''],
      password: [], 
      course: [''] 
     });
       }

  ngOnInit(): void {
     this.id_us= localStorage.getItem("userID");   

     this.servicio.getAllPersonStudent().subscribe(pers=>{
      this.pers=pers;
      this.actualizarFilasMostradas();

      this.servicio.getAllUsOrder(this.pers).subscribe(us=>{
        this.us=us;
 
       }); 
     }); 

     this.servicio.getAllStudent().subscribe(st=>{
      this.student=st; 

      this.servicio.getAllCourseOrder(this.student).subscribe(cor=>{
        this.course=cor;
        this.ready=true;
       }); 
     });   
  }
 
  agregarUsuario(): void { 
    const additionalData = {
      course: this.form.get('course')?.value, 
    };
 
     

    this.id_person=localStorage.getItem("personID"); 
    if (this.id_person !== null && this.id_person !== undefined) {
      const parsedId = parseInt(this.id_person, 10); 
      const formData = { ...this.form.getRawValue(), ...additionalData, id_person: parsedId };

      this.servicio.createStudent(formData).subscribe(respuesta => {
        alert("SE ASIGNO EL USUARIO CON EXITO");
      });
    } 

 
  
  }

  actualizarUsuario(): void { 
    const additionalData = {
      course: this.form.get('course')?.value,
      specialty: this.form.get('specialty')?.value,
      experience: this.form.get('experience')?.value
    };
 
    const formData = { ...this.form.getRawValue(), ...additionalData };
 
    this.servicio.updateStudent(formData).subscribe(respuesta => {
      alert(respuesta.message);
    });
  }

  onDeleteClick()
  {

  }


  seleccionarFila(selectedRow: any, selectedUs: any): void {
    this.form.patchValue({
      user_name: selectedUs.user_name,
      password: selectedUs.password,  
      name: selectedRow.name,
      last_name: selectedRow.last_name,
      age: selectedRow.age,
       
    });
  }

  cargarMasFilas(): void {
    this.startIndex += this.rowsPerPage;
    this.actualizarFilasMostradas();
  }

  private actualizarFilasMostradas(): void {
    this.displayedPers = this.pers.slice(this.startIndex, this.startIndex + this.rowsPerPage);
  }

}
