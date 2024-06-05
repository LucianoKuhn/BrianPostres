import { Injectable } from '@angular/core';

import {
  Auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from '@angular/fire/auth';
import { onAuthStateChanged, updateProfile } from 'firebase/auth';

import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root',
})
export class UserService {
  private sesionIniciadaSource = new BehaviorSubject<boolean>(false);
  sesionIniciada$ = this.sesionIniciadaSource.asObservable();

  sesionIniciada = false;

  constructor(private auth: Auth) {}

  ponerNombre(nombre:string){
    let authn = this.auth.currentUser;
    if(authn){
      updateProfile(authn,{displayName: nombre }).then(()=>{
      })
    } 
  }
  obtenerNombre(){
    let authn = this.auth.currentUser;
    let nombre;
    if(authn){
      nombre = authn.displayName ?? '';
      localStorage.setItem("nombre", nombre);
    }
  }

  async login({ email, password }: any) {
    return signInWithEmailAndPassword(this.auth, email, password);
  }

  emitirCambioSesion(estado: boolean) {
    this.sesionIniciadaSource.next(estado);
  }

  register({ email, password }: any) {
    return createUserWithEmailAndPassword(this.auth, email, password);
  }

  // loginWithGoogle() {
  //   return signInWithPopup(this.auth, new GoogleAuthProvider());
  // }
  logOut() {
    return signOut(this.auth);
  }

  async getCurrentUserEmail(): Promise<string | null> {
    const user = await this.auth.currentUser;
    return user ? user.email : null;
  }
  hayUsuario() {
    return new Promise((resolve, reject) => {
      onAuthStateChanged(this.auth, (user) => {
        if (user) {
          resolve(true);
        } else {
          resolve(false);
        }
      }, (error) => {
        reject(error);
      });
    });
  }
}
