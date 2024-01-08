import { IaService } from './../../servicios/ia.service';
import { Component } from '@angular/core'; 
@Component({
  selector: 'app-challenges',  
  templateUrl: './challenges.component.html', 
  styleUrls: ['./challenges.component.css']
})
export class ChallengesComponent {
  challengeDescription: string = '';
  reto1:string="";
  reto2:string="";
  reto3:string="";
  reto4:string="";
  cont:any=0;
  retosCargados: boolean = false;

  constructor(private openaiService: IaService) {}

  ngOnInit(): void {
    this.generateChallenge();
  }

  async generateChallenge():  Promise<void> {
    
    const prompt = "Crea 4 desafios cortos para estudiantes, que sean de las materias de ciencias, historia, matematicas e informatica; 1 reto para cada"+
    " materia, y damelo en esta estructura: Ciencias: el objetivo del reto y nada mas, Matematicas: el objetivo del reto y nada mas y asi sucesivamente. Cada reto que tenga solo 12 palabras"+
    " siempre respeta la estructura que te di Historia: reto Matematicas: reto Historia: reto Informatica: reto. Todos los retos en un mismo parrafo es decir terminas el reto de ciencias. Matematicas:"+
    " y asi sucesivamente, ademas cada reto quiero sea todo en mayusculas es decir CIENCIAS, MATEMÁTICAS, HISTORIA, INFORMÁTICA";
    try {
      this.challengeDescription = await this.openaiService.generateChallenge(prompt);
      this.parseChallenges();
      this.retosCargados = true;
      
    } catch (error) {
      console.error('Error al generar desafíos:', error);
    }
  }

  parseChallenges(): void {
 
    let cont=4;
   
    while (cont > 0) {
      if (this.challengeDescription.includes("CIENCIAS:")) {
        const indiceInicio = this.challengeDescription.indexOf("CIENCIAS:");
        const indiceFin = this.challengeDescription.indexOf(".");
    
        
        this.reto1 = this.challengeDescription.slice(indiceInicio + "CIENCIAS:".length, indiceFin+1).trim();
    
     
        this.challengeDescription = this.challengeDescription.slice(0, indiceInicio) +
          this.challengeDescription.slice(indiceFin+1);
      } else if (this.challengeDescription.includes("MATEMÁTICAS:")) {
        const indiceInicio = this.challengeDescription.indexOf("MATEMÁTICAS:");
        const indiceFin = this.challengeDescription.indexOf(".");
    
 
        this.reto2 = this.challengeDescription.slice(indiceInicio + "MATEMÁTICAS:".length, indiceFin+1).trim();
    
   
        this.challengeDescription = this.challengeDescription.slice(0, indiceInicio) +
          this.challengeDescription.slice(indiceFin+1);
      } else if (this.challengeDescription.includes("HISTORIA:")) {
        const indiceInicio = this.challengeDescription.indexOf("HISTORIA:");
        const indiceFin = this.challengeDescription.indexOf(".");
    
    
        this.reto3 = this.challengeDescription.slice(indiceInicio + "HISTORIA:".length, indiceFin+1).trim();
    
        
        this.challengeDescription = this.challengeDescription.slice(0, indiceInicio) +
          this.challengeDescription.slice(indiceFin+1);
      } else if (this.challengeDescription.includes("INFORMÁTICA:")) {
        const indiceInicio = this.challengeDescription.indexOf("INFORMÁTICA:");
        const indiceFin = this.challengeDescription.indexOf(".");
    
 
        this.reto4 = this.challengeDescription.slice(indiceInicio + "INFORMÁTICA:".length, indiceFin).trim();
    
        
        this.challengeDescription = this.challengeDescription.slice(0, indiceInicio) +
          this.challengeDescription.slice(indiceFin+1);
      }
    
      cont = cont - 1;
    } 


    console.log(this.reto1);
    console.log(this.reto2);
    console.log(this.reto3);
    console.log(this.reto4);
  
  }
 
  onFileSelected(event: any) {
    // Aquí puedes manejar la lógica cuando se selecciona un archivo
    const selectedFile = event.target.files[0];
    // Puedes almacenar el archivo seleccionado en una variable o realizar otras operaciones necesarias
  }

  uploadPDF() {
    // Aquí puedes implementar la lógica para subir el archivo PDF
    // Puedes usar la variable que contiene el archivo seleccionado (si la has almacenado) y enviarla al servidor, por ejemplo
  }
}
