import { IaService } from './../../servicios/ia.service';
import { Component } from '@angular/core'; 
@Component({
  selector: 'app-challenges',  
  templateUrl: './challenges.component.html', 
  styleUrls: ['./challenges.component.css']
})
export class ChallengesComponent {
  challengeDescription: string = '';

  constructor(private openaiService: IaService) {this.generateChallenge();}

  generateChallenge(): void {
    
    const prompt = 'Genera una desafio para estudiantes, sobre matematicas que sea corto.';
    this.openaiService.generateChallenge(prompt)
      .then((description) => this.challengeDescription = description);
      console.log(this.challengeDescription )
  }
}
