import { Injectable } from '@angular/core';
import axios from 'axios'; 
import { apiIa } from 'src/config';
 
const url = 'https://api.bard.com/'; 
@Injectable({
  providedIn: 'root'
})
export class IaService { 

  constructor() { 
  }

  public readonly storageReto1 = 'reto1'; 
  public readonly storageReto2 = 'reto2'; 
  public readonly storageReto3 = 'reto3'; 
  public readonly storageReto4 = 'reto4'; 
  private reto:string| null = null;

  private apiUrl = apiIa;
  
   
  generateChallenge(prompt: string): Promise<string> { 
  
 

    return axios.post(this.apiUrl+"api/get_result", {
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



  revisarChallenge(formData: FormData): Promise<string> {
    return axios.post(this.apiUrl + 'api/process_pdf', formData, {
      headers: {
        'Content-Type': 'multipart/form-data', 
      },
    })
      .then((response) => {
        console.log('Después de llamar a la API de Flask para revisar el desafío');
        return response.data.message;
      })
      .catch((error) => {
        console.error('Error al llamar a la API de Flask para revisar el desafío:', error);
        throw error;
      });
  }


  //storage
  setReto1(result:any)
  {
    localStorage.setItem(this.storageReto1, result);
  }

  setReto2(result:any)
  {
    localStorage.setItem(this.storageReto2,result);
  }

  setReto3(result:any)
  {
    localStorage.setItem(this.storageReto3, result);
  }

  setReto4(result:any)
  {
    localStorage.setItem(this.storageReto4, result);
  }



  getReto1()
  {
    this.reto= localStorage.getItem('reto1');
    return this.reto;
  }

  getReto2()
  {
    this.reto= localStorage.getItem('reto2');
    return this.reto;
  }

  getReto3()
  {
    this.reto= localStorage.getItem('reto3');
    return this.reto;
  }

  getReto4()
  {
    this.reto= localStorage.getItem('reto4');
    return this.reto;
  }


 

  //chat
  getResponseIA(message: any, idioma: any): Promise<string> {
    const requestData = {
      message: message,
      idioma: idioma
    };
    
    return axios.post(this.apiUrl + 'api/chat', requestData, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${url}`, 
      },
    })
    .then((response) => {
      console.log('Después de llamar a la API de Flask para revisar el desafío');
      return response.data.message;
    })
    .catch((error) => {
      console.error('Error al llamar a la API de Flask para revisar el desafío:', error);
      throw error;
    });
  }
}
