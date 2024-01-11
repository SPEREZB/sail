import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from '../login/login.service';
import { inject } from '@angular/core/testing';

@Injectable({
  providedIn: 'root'
}) 

export class GuardGuard implements CanActivate {
  constructor(private login: LoginService) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if(this.login.isAuthenticated()) return true;
    return false; 
  }
 
}
