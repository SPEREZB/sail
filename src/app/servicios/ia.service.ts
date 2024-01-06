import { Injectable } from '@angular/core';
import axios from 'axios';
import { OpenAI} from 'openai'; 
import { environment } from '../../environments/environment';
 
const apiKey = environment.API_KEY; 
@Injectable({
  providedIn: 'root'
})
export class IaService { 

  constructor() { 
  }

 
  private apiUrl = 'https://api.openai.com/v1/engines/text-davinci-002/completions';
  
   
  generateChallenge(prompt: string): Promise<string> { 
  
 

    return axios.post(this.apiUrl, {
      prompt,
      max_tokens: 300,
      timeout: 5000,
    }, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
    })
    .then((response) => {
      console.log('Después de llamar a la API de GPT-3');
      return response.data.choices[0].text;
    })
    .catch((error) => {
      console.error('Error al llamar a la API de GPT-3:', error);
      throw error;
    });
  }
}
