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

 
 
  getUs():Observable<any>{  
    return this.clientehttp.get(this.api+"api/user");
  } 


  getPerson():Observable<any>{  
    return this.clientehttp.get(this.api+"api/person/student/");
  } 
}
