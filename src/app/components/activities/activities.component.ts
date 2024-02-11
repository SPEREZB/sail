import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
 

@Component({
  selector: 'app-activities',
  templateUrl: './activities.component.html',
  styleUrls: ['./activities.component.css']
})
export class ActivitiesComponent implements OnInit {

  actividades:any; 

  constructor(private router:Router) {
    this.actividades = [
      { id: 1, nombre: 'Agregar actividades', icono: './../../../assets/course/aggactividad.png' },
      { id: 2, nombre: 'Revisar actividades', icono: './../../../assets/course/revisaractividad.jfif' } 
    ];
 
   }

 

  ngOnInit(): void {
  }


  onItemClick(curso: any): void {
    console.log('Item clicked:', curso);
    this.router.navigate(['profesor/cursos/añadir']);
  }
}
 