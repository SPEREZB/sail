 
import { Component, OnInit } from '@angular/core'; 
import { SailService } from '../../services/sail/sail.service';
 
import { Router } from '@angular/router';  
import { switchMap } from 'rxjs';
import { FormBuilder, FormGroup } from '@angular/forms';
import { LoginService } from 'src/app/services/login/login.service';

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
  id_person: number | undefined; 
  id_p:any;
  us: any;
  pers: any;
  initialPersonID:any;
  form: FormGroup;
  
  constructor( 
    private ruteador: Router,
    private authservice: LoginService,
    private formulario:FormBuilder,
    public servicio: SailService) {
       this.initialPersonID = parseInt(localStorage.getItem('personID') || '0', 10);
      this.form = this.formulario.group({
        id_person: [], name: [''], last_name: [''],age: []
     });
       }

  ngOnInit(): void {
    this.servicio.getAllUs().subscribe(us => {
      this.us = us;
  
      if (us.length > 0) {
        const id_person = us[0].id_person;
        if (id_person) {
          this.servicio.getPerson(id_person).subscribe(pers => {
            this.pers = pers;
          });
        }
      }
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