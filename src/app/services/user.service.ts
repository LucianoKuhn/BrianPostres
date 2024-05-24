import { Injectable } from '@angular/core';


import {
  Auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  signInWithPopup,
  GoogleAuthProvider,
} from '@angular/fire/auth';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private sesionIniciadaSource = new BehaviorSubject<boolean>(false);
  sesionIniciada$ = this.sesionIniciadaSource.asObservable();

  sesionIniciada = false;

  constructor(private auth: Auth) {
  }

  emitirCambioSesion(estado: boolean) {
    this.sesionIniciadaSource.next(estado);
  }

  register({ email, password }: any) {
    return createUserWithEmailAndPassword(this.auth, email, password);
  }

  login({ email, password }: any) {
    return signInWithEmailAndPassword(this.auth, email, password);
  }

  loginWithGoogle() {
    return signInWithPopup(this.auth, new GoogleAuthProvider());
  }
  logOut() {
    return signOut(this.auth);
  }

  async getCurrentUserEmail(): Promise<string | null> {
    const user = await this.auth.currentUser;
    return user ? user.email : null;
  }
}
