import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class UserProfileService {

  private userProfilesRef: AngularFireList<any>;
  public userProfile$ = new BehaviorSubject(null);

  constructor(private angularFireDatabase: AngularFireDatabase) {
    this.userProfilesRef = this.angularFireDatabase.list('/user-profiles');
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
}
