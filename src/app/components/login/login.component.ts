import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  userType:any="";
  isRegistro: boolean = false; 

  constructor() { }

  ngOnInit(): void {
  }

  updateImage() {
    const iconElement = document.getElementById('icon') as HTMLImageElement;
  
    if (this.userType === 'estudiante') {
      iconElement.src = '../../../assets/login/estudiante.png';
    } else if (this.userType === 'profesor') {
      iconElement.src = '../../../assets/login/profe.png';
    }
  }

  toggleRegistro() {
    this.isRegistro = !this.isRegistro;
  }

}
