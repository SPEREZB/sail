 
import { Component, OnInit } from '@angular/core'; 
import { SailService } from '../../servicios/sail.service';
 
import { Router } from '@angular/router';  
import { switchMap } from 'rxjs';

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
 
} 