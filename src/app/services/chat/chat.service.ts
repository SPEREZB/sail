import { Injectable, Component, inject } from '@angular/core'; 
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/compat/storage';
import { Observable, finalize,map, from, throwError } from 'rxjs'; 
import { HttpClient } from '@angular/common/http';   
 
 
import { apiUrl, apiIa } from 'src/config';
import { AngularFireDatabase } from '@angular/fire/compat/database'; 


@Injectable({
  providedIn: 'root'
})

export class ChatService {
  descarga: any;
  api = apiUrl; 
  apiIa=apiIa;
  
  
  constructor( 
    private storage: AngularFireStorage,   
    private db: AngularFireDatabase,
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

  private basePath = '/archivos';

  saveFileInStorage(file: File | null, studentId: string, activityId: string): Observable<number | null> {
    if (!file) {
      console.error('No se proporcionó ningún archivo para cargar.');
      return new Observable<number | null>();
    }

    const filePath = `${this.basePath}/${studentId}_${activityId}_${file.name}`;
    const storageRef = this.storage.ref(filePath);
    const uploadTask: AngularFireUploadTask = this.storage.upload(filePath, file);

    return this.trackUploadProgress(uploadTask).pipe(
      finalize(() => {
        storageRef.getDownloadURL().subscribe(downloadURL => {
          const fileUpload = { name: file.name, url: downloadURL, file }; 
        });
      })
    );
  }
 

  private trackUploadProgress(uploadTask: AngularFireUploadTask): Observable<number | null> {
    return uploadTask.percentageChanges().pipe(
      map(percentage => percentage || null)
    );
  }
}
 