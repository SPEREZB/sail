import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { apiUrl } from 'src/config';

@Injectable({
  providedIn: 'root'
})
export class SailService {

  api = apiUrl;   
  
  constructor(public clientehttp: HttpClient){ }

 
  //get
  //users
  getAllUs():Observable<any>{  
    return this.clientehttp.get(this.api+"api/user");
  } 

  getVerify(body:any):Observable<any>{  
    return this.clientehttp.post<any>(this.api+"api/user/verificar",body);
  } 
  
  getUs(id_us: number):Observable<any>{  
    return this.clientehttp.get(this.api+"api/user/byId/"+id_us);
  }  
  
  //person
  getAllPerson():Observable<any>{  
    return this.clientehttp.get(this.api+"api/person");
  }  

  getAllPersonTeacher():Observable<any>{  
    return this.clientehttp.get(this.api+"api/person/teacher");
  } 

  getPerson(id_person: number):Observable<any>{  
    return this.clientehttp.get(this.api+"api/person/byId/"+id_person);
  }  

  //teacher
  getAllTeacher():Observable<any>{  
    return this.clientehttp.get(this.api+"api/teacher");
  }  

  getTeacher(id_teacher: number):Observable<any>{  
    return this.clientehttp.get(this.api+"api/teacher/byId/"+id_teacher);
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
