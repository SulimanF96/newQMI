import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class UserProfileService {

  private userProfilesRef: AngularFireList<any>;
  public userProfile$ = new BehaviorSubject(null);
  public userProfile = [];
  private userID: string;

  constructor(private angularFireDatabase: AngularFireDatabase, private angularFireAuth: AngularFireAuth) {
    this.userProfilesRef = this.angularFireDatabase.list('/user-profiles');
    this.userProfile$.subscribe(userProfile => {
      this.userProfile = userProfile;
    });
    this.angularFireAuth.authState.subscribe(authState => {
      this.userID = authState.uid;
    });
  }

  getUserProfile(userID: string) {
    return this.userProfilesRef.query.orderByKey().equalTo(userID).once('value');
  }

  createUserProfile(userID: string, email: string) {
    const userProfile = {
      isAdmin: false,
      username: email.substring(0, email.indexOf('@')),
      email: email,
      photo: 'no photo',
      history: [],
      favorites: []
    };
    console.log(userProfile);
    return this.userProfilesRef.set(userID, userProfile);
  }

  addNewSearchHistory(search: string) {
    let newUserProfile = {
      isAdmin: this.userProfile.isAdmin,
      username: this.userProfile.username,
      email: this.userProfile.email,
      photo: this.userProfile.photo,
      history: this.userProfile.history.push(search),
      favorites: this.userProfile.favorites
    };
    return this.userProfilesRef.update(this.userID, newUserProfile);
  }
}
