import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginService { 
  
  public readonly storageKey = 'userLoggedIn';
  public readonly storageIDUS = 'userID';
  public readonly storageIDPERS = 'personID';
  public readonly storageKeyUSTYPE = 'userType'; 
  private isLoggedIn: boolean = false;
  private local:string | null = null;
  private userTypeVar:string| null = null;

  constructor(private router: Router) {} 

  login() {
    this.isLoggedIn = true;
    localStorage.setItem(this.storageKey, 'true');
  }

  logout() {
    this.isLoggedIn = false;
    localStorage.setItem(this.storageKey, 'false');
    this.router.navigate(['/']);
  }

  isAuthenticated():boolean{    
    this.local = localStorage.getItem('userLoggedIn');
    if(this.local=='true') this.isLoggedIn=true;
    else this.isLoggedIn=false;
    return this.isLoggedIn;
  }

  userType(ustype:string)
  {
    localStorage.setItem(this.storageKeyUSTYPE, ustype);
  } 

  logoutuserType()
  {
    localStorage.setItem(this.storageKeyUSTYPE, '');
  } 

  isUserType()
  {
    this.userTypeVar= localStorage.getItem('userType');
    return this.userTypeVar;
  }

  idUs(id:any)
  {
    localStorage.setItem(this.storageIDUS, id);
  } 

  
  idPerson(id:any)
  {
    localStorage.setItem(this.storageIDPERS, id);
  } 
}
