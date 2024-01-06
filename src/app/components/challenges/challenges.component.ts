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
    
    const prompt = "Crea 4 desafios cortos para estudiantes, que sean de las materias de ciencias, deportes, matematicas e informatica; 1 reto para cada"+
    " materia, y damelo en esta estructura: Ciencias: el objetivo del reto y nada mas, Matematicas: el objetivo del reto y nada mas y asi sucesivamente. Cada reto que tenga solo 12 palabras"+
    " siempre respeta la estructura que te di Ciencias: reto Matematicas: reto Deportes: reto Informatica: reto. Todos los retos en un mismo parrafo es decir terminas el reto de ciencias. Matematicas:"+
    " y asi sucesivamente, ademas cada reto quiero que inicie en mayusculas";
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
      if (this.challengeDescription.includes("Ciencias:")) {
        const indiceInicio = this.challengeDescription.indexOf("Ciencias:");
        const indiceFin = this.challengeDescription.indexOf(".");
    
        // Obtener el texto entre las palabras de inicio y fin
        this.reto1 = this.challengeDescription.slice(indiceInicio + "Ciencias:".length, indiceFin+1).trim();
    
        // Quitar el reto y la palabra Ciencias:
        this.challengeDescription = this.challengeDescription.slice(0, indiceInicio) +
          this.challengeDescription.slice(indiceFin+1);
      } else if (this.challengeDescription.includes("Matemáticas:")) {
        const indiceInicio = this.challengeDescription.indexOf("Matemáticas:");
        const indiceFin = this.challengeDescription.indexOf(".");
    
        // Obtener el texto entre las palabras de inicio y fin
        this.reto2 = this.challengeDescription.slice(indiceInicio + "Matemáticas:".length, indiceFin+1).trim();
    
        // Quitar el reto y la palabra Matematicas:
        this.challengeDescription = this.challengeDescription.slice(0, indiceInicio) +
          this.challengeDescription.slice(indiceFin+1);
      } else if (this.challengeDescription.includes("Deportes:")) {
        const indiceInicio = this.challengeDescription.indexOf("Deportes:");
        const indiceFin = this.challengeDescription.indexOf(".");
    
        // Obtener el texto entre las palabras de inicio y fin
        this.reto3 = this.challengeDescription.slice(indiceInicio + "Deportes:".length, indiceFin+1).trim();
    
        // Quitar el reto y la palabra Deportes:
        this.challengeDescription = this.challengeDescription.slice(0, indiceInicio) +
          this.challengeDescription.slice(indiceFin+1);
      } else if (this.challengeDescription.includes("Informática:")) {
        const indiceInicio = this.challengeDescription.indexOf("Informática:");
        const indiceFin = this.challengeDescription.indexOf(".");
    
        // Obtener el texto entre las palabras de inicio y fin
        this.reto4 = this.challengeDescription.slice(indiceInicio + "Informática:".length, indiceFin).trim();
    
        // Quitar el reto y la palabra Informatica:
        this.challengeDescription = this.challengeDescription.slice(0, indiceInicio) +
          this.challengeDescription.slice(indiceFin+1);
      }
    
      cont = cont - 1;
    } 
  
  }
}
