import { AlertService } from 'src/app/servicios/alert.service';
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
  selectedFile: any;

  constructor(private openaiService: IaService,private alertService: AlertService) {}

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
    
    this.selectedFile = event.target.files[0];
    this.uploadPDF();
  }

  uploadPDF() {
    if (this.selectedFile) { 
      const formData = new FormData();
      formData.append('pdf', this.selectedFile);
 
      this.openaiService.revisarChallenge(formData).then((result) => {
        console.log('Resultado de revisarChallenge:', result);
 
        if (result === '1') {
          this.showSuccessAlert(); 
        } else { 
          this.showErrorAlert(); 
        }
      }).catch((error) => {
        console.error('Error en revisarChallenge:', error);
        alert('Error al revisar el desafío');
      });
    } else {
      alert('Selecciona un archivo PDF primero');
    }
  }


  showSuccessAlert() {
    this.alertService.showAlert('¡DESAFIO COMPLETADO EXITOSAMENTE!');
  }

  showErrorAlert() {
    this.alertService.showAlert('¡HAS FALLADO EL DESAFIO!');
  }
}
