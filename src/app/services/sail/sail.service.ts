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
   
  getAllUsTeacher(persons:any):Observable<any>{  
    return this.clientehttp.post(this.api+"api/user/teacher", persons);
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

  getPersonTeacher(id_person: number):Observable<any>{  
    return this.clientehttp.get(this.api+"api/person/teacher/byId/"+id_person);
  }  

  getAllPersonTeacher():Observable<any>{  
    return this.clientehttp.get(this.api+"api/person/teacher");
  } 
  
  getPersonStudent(id_person: number):Observable<any>{  
    return this.clientehttp.get(this.api+"api/person/student/byId/"+id_person);
  }  

  getPersonIdStudent(id_student: any):Observable<any>{  
    return this.clientehttp.post(this.api+"api/person/student/byIdStudent",id_student);
  }  

  getAllPersonStudent():Observable<any>{  
    return this.clientehttp.get(this.api+"api/person/student");
  }   


  //teacher
  getTeacher(id_person: number):Observable<any>{  
    return this.clientehttp.get(this.api+"api/teacher/byId/"+id_person);
  }  
  
  getAllTeacher():Observable<any>{  
    return this.clientehttp.get(this.api+"api/teacher");
  }  

  asigTeacher(teacher:any):Observable<any>{  
    return this.clientehttp.post(this.api+"api/teacher/asig", teacher);
  }  
 


  //student
  getStudent(id_person:any):Observable<any>{  
    return this.clientehttp.get(this.api+"api/student/byId/"+id_person);
  } 

  getAllStudent():Observable<any>{  
    return this.clientehttp.get(this.api+"api/student");
  } 

  getAllStudentofCoursebySubject(id_subject:any):Observable<any>{  
    return this.clientehttp.get(this.api+"api/student/ofcoursebysubject/"+id_subject);
  } 

 
  //course
  getCourse(id_course: number):Observable<any>{  
    return this.clientehttp.get(this.api+"api/course/byId/"+id_course);
  }  

  getAllCourse():Observable<any>{  
    return this.clientehttp.get(this.api+"api/course");
  } 

  getAllCourseOrder(students:any):Observable<any>{  
    return this.clientehttp.post(this.api+"api/course", students);
  }  

  getCourseOfStudentById(id_course: number):Observable<any>{  
    return this.clientehttp.get(this.api+"api/course/student/byId/"+id_course);
  }   


  //subject
  getAllSubject():Observable<any>{  
    return this.clientehttp.get(this.api+"api/subject");
  } 

  getAllSubjectTeacher(body:any):Observable<any>
  {  
    return this.clientehttp.post(this.api+"api/subject/teacher",body);
  }

  getSubjectOfTeacher(body: { id_teacher: string }):Observable<any>{  
    return this.clientehttp.post(this.api+"api/subject/teacher/byId",body);
  } 

  getSubjectOfStudent(body: { id_course: string }):Observable<any>{  
    return this.clientehttp.post(this.api+"api/subject/student/byId",body);
  } 

  
  //activity
  getAllActivity():Observable<any>{  
    return this.clientehttp.get(this.api+"api/activity");
  } 

  getActivityStudent(id_course:any):Observable<any>{  
    return this.clientehttp.get(this.api+"api/activity/student/"+ id_course);
  }  

  // IMG
  getImg(ruta: any[]): Observable<any> {
    // Utiliza una solicitud POST para enviar las rutas en el cuerpo del mensaje
    return this.clientehttp.post(`${this.api}api/firebase`, { ruta });
  }
 

  //create
  createUs(body:any):Observable<any>
  {  
    return this.clientehttp.post(this.api+"api/user/create",body);
  }

  createStudent(body:any):Observable<any>
  {  
    return this.clientehttp.post(this.api+"api/student/create",body);
  }

  createActivity(body:any):Observable<any>
  {  
    return this.clientehttp.post(this.api+"api/activity/create",body);
  }

 


  //update
  updateUs(body: any):Observable<any>
  {
    return this.clientehttp.post(this.api+"update/user",body);
  }

  updateStudent(body: any):Observable<any>
  {
    return this.clientehttp.post(this.api+"update/user",body);
  }
}
