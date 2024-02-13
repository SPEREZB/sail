import { Injectable } from '@angular/core';
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";
import { firebase } from "src/config/index";


const firebaseConfig = firebase;
 
@Injectable({
  providedIn: 'root'
})
 
export class FireService {

  constructor() {
    initializeApp(firebaseConfig);
 }

 getStorage() {
    return getStorage();
 }

 getAuth() {
    return getAuth();
 }
}
