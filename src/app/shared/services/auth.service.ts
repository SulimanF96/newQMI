import { User } from './../../models/user';
import { AngularFireAuth } from '@angular/fire/auth';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private angularFireAuth: AngularFireAuth) {}

  createUser(credentials: User) {
    return this.angularFireAuth.createUserWithEmailAndPassword(credentials.email, credentials.password);
  }

  login(credentials: User) {
    return this.angularFireAuth.signInWithEmailAndPassword(credentials.email, credentials.password);
  }

  logout() {
    return this.angularFireAuth.signOut();
  }
}
