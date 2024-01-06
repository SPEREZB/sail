import { Injectable } from '@angular/core';
import axios from 'axios'; 
 
const url = 'https://api.bard.com/'; 
@Injectable({
  providedIn: 'root'
})
export class IaService { 

  constructor() { 
  }

 
  private apiUrl = 'http://127.0.0.1:5000/api/get_result';
  
   
  generateChallenge(prompt: string): Promise<string> { 
  
 

    return axios.post(this.apiUrl, {
      prompt,
      max_tokens: 300,
      timeout: 5000,
    }, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${url}`,
      },
    })
    .then((response) => {
      console.log('Después de llamar a la API de FLASK');
      return response.data.message;
    })
    .catch((error) => {
      console.error('Error al llamar a la API de FLASK:', error);
      throw error;
    });
  }
}
