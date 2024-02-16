 
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
  initialPersonID:any;
  form: FormGroup;
  loginInfo:any;
  
  constructor( 
    dates:Dates,
    private formulario:FormBuilder,
    public servicio: SailService) {
       this.initialPersonID = parseInt(localStorage.getItem('personID') || '0', 10);
      this.form = this.formulario.group({
        id_person: [], name: [''], last_name: [''],age: []
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