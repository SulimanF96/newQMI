import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class UserProfileService {

  private userProfilesRef: AngularFireList<any>;

  constructor(private angularFireDatabase: AngularFireDatabase) {
    this.userProfilesRef = this.angularFireDatabase.list('/user-profile');
  }
}
