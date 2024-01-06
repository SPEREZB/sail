 
import { Component, OnInit } from '@angular/core'; 
import { SailService } from '../../servicios/sail.service';
 
import { Router } from '@angular/router';  

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
  us: any;
  pers: any;

  constructor( 
    private ruteador: Router,
    public servicio: SailService) { this.ngOnInit(); }

  ngOnInit(): void {
    this.servicio.getUs().subscribe(respuesta => { 
      this.us = respuesta;
    });

    this.servicio.getPerson().subscribe(respuesta => { 
      this.pers = respuesta;
    });
  }
 
} 