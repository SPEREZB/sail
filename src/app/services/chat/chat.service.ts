import { Injectable } from '@angular/core'; 
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Observable, from, throwError } from 'rxjs'; 
import { HttpClient } from '@angular/common/http';   
import { apiUrl, apiIa } from 'src/config';


@Injectable({
  providedIn: 'root'
})

export class ChatService {
  descarga: any;
  api = apiUrl;

  apiIa=apiIa;

  constructor( 
    private storage: AngularFireStorage,
    private httpClient:HttpClient
  ) {}

  saveChat(messages: string[], chatId: string): void {  
    this.saveChatInStorage(messages, chatId);
  }
 
  private saveChatInStorage(messages: string[], chatId: string): void { 
    const jsonMessages = JSON.stringify({ messages });
 
    const chatStorageRef = this.storage.ref(`chats/${chatId}.json`);
 
    const uploadTask = chatStorageRef.putString(jsonMessages);

    uploadTask.then(() => {
      console.log('Chat guardado exitosamente en Firebase Storage');
    }).catch((error) => {
      console.error('Error al guardar el chat en Firebase Storage:', error);
    });
  }
 

  getPDF(chatId: string):Observable<any>{  
    return this.httpClient.get(this.api+"downloadJson/"+chatId);
  } 


  getResponseIA(message:any)
  {
    return this.httpClient.post(this.apiIa+"api/chat",message);
  }
}