import { Injectable } from '@angular/core';
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";



const firebaseConfig = {
  apiKey: "AIzaSyD04Ux8zdPEviJed8XAaK0IQBPik3Ss6D8",
  authDomain: "sail-291ea.firebaseapp.com",
  projectId: "sail-291ea",
  storageBucket: "sail-291ea.appspot.com",
  messagingSenderId: "860001777362",
  appId: "1:860001777362:web:14dad4efc62c5853149f0b",
  measurementId: "G-EQE43QZEF3"
 };
 
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
