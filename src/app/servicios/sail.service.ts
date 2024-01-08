import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SailService {

  api = "http://localhost:3000/";  
 
  private showTemplate = "false";
  
  constructor(public clientehttp: HttpClient){ }

 
 
  getAllUs():Observable<any>{  
    return this.clientehttp.get(this.api+"api/user");
  } 

  getUs(body:any):Observable<any>{  
    return this.clientehttp.post<any>(this.api+"verificar",body);
  } 


  getPerson(id_person: number):Observable<any>{  
    return this.clientehttp.get(this.api+"api/person/student/"+id_person);
  } 
}
