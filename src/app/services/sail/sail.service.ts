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

 
  //get
  //users
  getAllUs():Observable<any>{  
    return this.clientehttp.get(this.api+"api/user");
  } 

  getVerify(body:any):Observable<any>{  
    return this.clientehttp.post<any>(this.api+"verificar",body);
  } 
  
  getUs(id_us: number):Observable<any>{  
    return this.clientehttp.get(this.api+"api/user/student/"+id_us);
  }  
  
  //person
  getPerson(id_person: number):Observable<any>{  
    return this.clientehttp.get(this.api+"api/person/student/"+id_person);
  }  

  //create
  createUs(body:any):Observable<any>
  {  
    return this.clientehttp.post(this.api+"api/user/create",body);
  }

  //update
  updateUs(body: any):Observable<any>
  {
    return this.clientehttp.post(this.api+"update/user",body);
  }
}
