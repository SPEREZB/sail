import { Injectable } from '@angular/core'; 
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/compat/storage';
import { Observable, finalize,map, forkJoin, catchError, of } from 'rxjs'; 
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

  // GUARDAR DEBERES

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

  //OBTENER DEBERES

  getFilesByIds(students: any[], activities: any[]): Observable<string[]> {
    const folderPath = 'archivos';
    const folderRef = this.storage.ref(folderPath);
  
    
    const observables: Observable<string[]>[] = [];
  
 
    for (let i = 0; i < students.length; i++) {
      const student = students[i];
  
      // Bucle para cada id_activities
      for (let j = 0; j < activities.length; j++) {
        const activity = activities[j];
  
    
        const observable = folderRef.listAll().pipe(
          map((result) =>
            result.items
              .filter((item) => {
                const itemName = item.name;
                return itemName.startsWith(`${student.id_student}_${activity.id_activities}_`);
              })
              .map((item) => item.name)
          ),
          catchError(() => of([]))  
        );
   
        observables.push(observable);
      }
    }
   
    return forkJoin(observables).pipe(
      map((arrays) => arrays.reduce((acc, arr) => acc.concat(arr), []))  
    );
  }

  downloadFile(fileName: string): void {
    const filePath = `archivos/${fileName}`;
    const fileRef = this.storage.ref(filePath);

    fileRef.getDownloadURL().subscribe((url) => { 
      window.open(url, '_blank');
    });
  }
}
 