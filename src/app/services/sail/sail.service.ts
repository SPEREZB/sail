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
  getUs(id_us: number):Observable<any>{  
    return this.clientehttp.get(this.api+"api/user/byId/"+id_us);
  }  

  getAllUs():Observable<any>{  
    return this.clientehttp.get(this.api+"api/user");
  } 

  getAllUsOrder(persons:any):Observable<any>{  
    return this.clientehttp.post(this.api+"api/user", persons);
  } 

  getVerify(body:any):Observable<any>{  
    return this.clientehttp.post<any>(this.api+"api/user/verificar",body);
  } 


  //person
  getPerson(id_person: number):Observable<any>{  
    return this.clientehttp.get(this.api+"api/person/byId/"+id_person);
  }  

  getAllPerson():Observable<any>{  
    return this.clientehttp.get(this.api+"api/person");
  }  

  getAllPersonTeacher():Observable<any>{  
    return this.clientehttp.get(this.api+"api/person/teacher");
  }  

  getAllPersonStudent():Observable<any>{  
    return this.clientehttp.get(this.api+"api/person/student");
  }   


  //teacher
  getTeacher(id_teacher: number):Observable<any>{  
    return this.clientehttp.get(this.api+"api/teacher/byId/"+id_teacher);
  }  
  
  getAllTeacher():Observable<any>{  
    return this.clientehttp.get(this.api+"api/teacher");
  }  

   


  //student
  getAllStudent():Observable<any>{  
    return this.clientehttp.get(this.api+"api/student");
  } 


  //course
  getCourse(id_course: number):Observable<any>{  
    return this.clientehttp.get(this.api+"api/course/byId/"+id_course);
  }  

  getAllCourseOrder(students:any):Observable<any>{  
    return this.clientehttp.post(this.api+"api/course", students);
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
