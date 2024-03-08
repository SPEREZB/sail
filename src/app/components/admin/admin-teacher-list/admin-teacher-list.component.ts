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
  ready:any;
  us: any;
  pers: any;
  teach:any;
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
        id_person: [], name: [''], last_name: [''],age: [],user_name: [''],
        password: [],titulo: [],especialidad: [''], experiencia: [] 
     });
       }

  ngOnInit(): void {
     this.id_us= localStorage.getItem("userID"); 

     this.servicio.getAllPersonTeacher().subscribe(pers=>{
      this.pers=pers;

      this.servicio.getAllUsTeacher(this.pers).subscribe(us=>{
        this.us=us.result;
        this.ready=true;
       });

      this.actualizarFilasMostradas();
     });
     
     this.servicio.getAllTeacher().subscribe(teach=>{
      this.teach=teach;
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

  seleccionarFila(selectedRow: any, selectedUs: any, selectedTeach:any): void {
    this.form.patchValue({
      user_name: selectedUs.user_name,
      password: selectedUs.password,  
      name: selectedRow.name,
      last_name: selectedRow.last_name,
      age: selectedRow.age,
      titulo: selectedTeach.academic_degree,
      especialidad: selectedTeach.specialization,
      experiencia: selectedTeach.work_experience,
       
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
