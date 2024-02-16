import { AlertService } from 'src/app/services/alert/alert.service';
import { IaService } from '../../services/ia/ia.service';
import { Component } from '@angular/core'; 
@Component({
  selector: 'app-challenges',  
  templateUrl: './challenges.component.html', 
  styleUrls: ['./challenges.component.css']
})
export class ChallengesComponent {
  challengeDescription: string = '';
  result:any;
  reto1:string="";
  reto2:string="";
  reto3:string="";
  reto4:string="";

  isReto1:string| null = null;
  isReto2:string| null = null;
  isReto3:string| null = null;
  isReto4:string| null = null;

  alertType:string="";
  cont:any=0;
  retosCargados: boolean = false;
  selectedFile: any;

  constructor(private openaiService: IaService,private alertService: AlertService) {}

  ngOnInit(): void {

    this.generateChallenge();
    this.openaiService.setReto1("true"); 
  }

  async generateChallenge():  Promise<void> {
    
    const prompt = "Crea 4 desafios cortos para estudiantes, que sean de las materias de ciencias, historia, matematicas e informatica; 1 reto para cada"+
    " materia, y damelo en esta estructura: Ciencias: el objetivo del reto y nada mas, Matematicas: el objetivo del reto y nada mas y asi sucesivamente. Cada reto que tenga solo 12 palabras"+
    " siempre respeta la estructura que te di Historia: reto Matematicas: reto Historia: reto Informatica: reto. Todos los retos en un mismo parrafo es decir terminas el reto de CIENCIAS, y sigues"+ 
    " con el de Matematicas y asi sucesivamente, osea todo va seguido no quiero que hagas ningun salto a otro parrafo, ademas cada reto quiero sea todo en mayusculas es decir CIENCIAS, MATEMÁTICAS,"+
    " HISTORIA, INFORMÁTICA y siempre al final de cada reto pon un . pero solo uno no quiero q pongas mas osea el . y luego sgues con el otro reto";
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
 
  }
 
  onFileSelected(event: any, challengeFunction: string, challenge:any) {
    
    this.selectedFile = event.target.files[0];
    this.uploadPDF(challengeFunction,challenge); 
  }

  uploadPDF(challengeFunction: string,challenge:any) {
    if (this.selectedFile) { 
      const formData = new FormData();
      formData.append('pdf', this.selectedFile);
      formData.append('challenge', challenge);
 
      this.openaiService.revisarChallenge(formData).then((result) => {
        console.log('Resultado de revisarChallenge:', result);
        this.result=result;
        
        if (result === '1') {
          this.showSuccessAlert(); 

          if (challengeFunction === 'challenge1') {
            this.challenge1();
          } else  if (challengeFunction === 'challenge2') {
            this.challenge2();
          } else  if (challengeFunction === 'challenge3') {
            this.challenge3();
          } else  {
            this.challenge4();
          } 
 

        } else { 
          this.showErrorAlert(); 

          if (challengeFunction === 'challenge1') {
            this.challenge1();
          } else  if (challengeFunction === 'challenge2') {
            this.challenge2();
          } else  if (challengeFunction === 'challenge3') {
            this.challenge3();
          } else  {
            this.challenge4();
          } 
        }
      }).catch((error) => {
        console.error('Error en revisarChallenge:', error);
        alert('Error al revisar el desafío');
      });
    } else {
      alert('Selecciona un archivo PDF primero');
    } 
  }

  challenge1()
  {
    if(this.result=="1")  this.openaiService.setReto1("true"); 
    else  this.openaiService.setReto1("false"); 
    this.isReto1=this.openaiService.getReto1(); 
  }

  challenge2()
  {
    if(this.result=="1")  this.openaiService.setReto2("true"); 
    else  this.openaiService.setReto2("false");  
    this.isReto2=this.openaiService.getReto2(); 
  }

  challenge3()
  {
    if(this.result=="1")  this.openaiService.setReto3("true"); 
    else  this.openaiService.setReto3("false");  
    this.isReto3=this.openaiService.getReto3(); 
  }

  challenge4()
  {
    if(this.result=="1")  this.openaiService.setReto4("true"); 
    else  this.openaiService.setReto4("false");  
    this.isReto4=this.openaiService.getReto4(); 
  }


  showSuccessAlert() {
    this.alertType="true";  
    this.alertService.showAlert('¡DESAFIO COMPLETADO EXITOSAMENTE!');
  }

  showErrorAlert() {
    this.alertType="false"; 
    this.alertService.showAlert('¡HAS FALLADO EL DESAFIO!');
  }
} 