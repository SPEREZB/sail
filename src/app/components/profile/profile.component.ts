 
import { Component, OnInit } from '@angular/core'; 
import { SailService } from '../../services/sail/sail.service';
import { Dates } from 'src/app/dates/dates'; 
import { FormBuilder, FormGroup } from '@angular/forms'; 

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
  selector: 'app-profile', 
  templateUrl: './profile.component.html', 
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent { 

  userData: UserProfile[] = [];
  personData: PersonProfile[] = [];
  id_us: string | null = null;
  id_person: string | null = null; 
  us: any;
  pers: any;
  initialUserID:any;
  initialPersonID:any;
  form: FormGroup;
  loginInfo:any;
  
  constructor( 
    dates:Dates,
    private formulario:FormBuilder,
    public servicio: SailService) {
       this.initialPersonID = parseInt(localStorage.getItem('personID') || '0', 10);
       this.initialUserID = parseInt(localStorage.getItem('userID') || '0', 10); 

      this.form = this.formulario.group({
        id_us: [this.initialUserID],id_person: [this.initialPersonID], user_name: [''], password: [''], name: [''], last_name: [''],age: []
     });

     this.loginInfo = dates.loginInfo;
       }

  ngOnInit(): void {
     this.id_us= localStorage.getItem("userID");
     this.id_person=localStorage.getItem("personID"); 

     if (this.id_us !== null && this.id_us !== undefined) {
      const parsedId = parseInt(this.id_us, 10);
     
      this.servicio.getUs(parsedId).subscribe(us => {
        this.us = us;
      }); 
    }

    if (this.id_person !== null && this.id_person !== undefined) {
      const parsedId = parseInt(this.id_person, 10);
     
      this.servicio.getPerson(parsedId).subscribe(pers => {
        this.pers = pers;
      }); 
    } 
  }
 

  onDeleteClick()
  {

  }

  actualizarDatos(datos:any): void {  
    this.servicio.updateStudent(datos.value).subscribe(respuesta => {
      alert("DATOS ACTUALIZADOS CORRECTAMENTE");
    });
  }
 
} 