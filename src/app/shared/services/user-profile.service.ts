import { BehaviorSubject, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class UserProfileService {

  private userProfilesRef: AngularFireList<any>;
  public userProfile$ = new BehaviorSubject(null);
  public userID$ = new BehaviorSubject(null);

  constructor(private angularFireDatabase: AngularFireDatabase, private angularFireAuth: AngularFireAuth) {
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
    return this.userProfilesRef.set(userID, userProfile);
  }

  async addNewEnteryToSearchHistory(search: string) {
    let newUserProfile = {};
    let searchHistory = [];
    await this.getUserProfile(this.userID$.value).then(userProfile => {
      userProfile.forEach((userProfile) => {
        if (userProfile.val().history !== undefined && userProfile.val().favorites !== undefined) {
          if (!userProfile.val().history.includes(search, 0)) {
            searchHistory = userProfile.val().history;
            searchHistory.push(search);
          }
          newUserProfile = {
            email: userProfile.val().email,
            isAdmin: userProfile.val().isAdmin,
            photo: userProfile.val().photo,
            username: userProfile.val().username,
            history: !userProfile.val().history.includes(search, 0) ?  searchHistory : userProfile.val().history,
            favorites: userProfile.val().favorites
          };
        } else if (userProfile.val().history !== undefined && userProfile.val().favorites === undefined) {
          if (!userProfile.val().history.includes(search, 0)) {
            searchHistory = userProfile.val().history;
            searchHistory.push(search);
          }
          newUserProfile = {
            email: userProfile.val().email,
            isAdmin: userProfile.val().isAdmin,
            photo: userProfile.val().photo,
            username: userProfile.val().username,
            history: !userProfile.val().history.includes(search, 0) ?  searchHistory : userProfile.val().history,
          };
        } else if (userProfile.val().history === undefined && userProfile.val().favorites !== undefined) {
          newUserProfile = {
            email: userProfile.val().email,
            isAdmin: userProfile.val().isAdmin,
            photo: userProfile.val().photo,
            username: userProfile.val().username,
            history: [search],
            favorites: userProfile.val().favorites
          };
        } else {
          newUserProfile = {
            email: userProfile.val().email,
            isAdmin: userProfile.val().isAdmin,
            photo: userProfile.val().photo,
            username: userProfile.val().username,
            history: [search]
          };
        }
      });
    }).catch(error => {
      console.log(error);
    });
    this.userProfile$.next(newUserProfile);
    return this.userProfilesRef.update(this.userID$.value, newUserProfile);
  }

  async deleteEnteryFromSearchHistory(search: string) {
    let newUserProfile = {};
    let searchHistory = [];
    await this.getUserProfile(this.userID$.value).then(userProfile => {
      userProfile.forEach((userProfile) => {
        if (userProfile.val().history !== undefined && userProfile.val().favorites !== undefined) {
          if (userProfile.val().history.includes(search, 0)) {
            searchHistory = userProfile.val().history;
            searchHistory.splice(searchHistory.indexOf(search), 1);
          }
          newUserProfile = {
            email: userProfile.val().email,
            isAdmin: userProfile.val().isAdmin,
            photo: userProfile.val().photo,
            username: userProfile.val().username,
            history: userProfile.val().history.includes(search, 0) ?  searchHistory : userProfile.val().history,
            favorites: userProfile.val().favorites
          };
        } else if (userProfile.val().history !== undefined && userProfile.val().favorites === undefined) {
          if (userProfile.val().history.includes(search, 0)) {
            searchHistory = userProfile.val().history;
            searchHistory.splice(searchHistory.indexOf(search), 1);
          }
          newUserProfile = {
            email: userProfile.val().email,
            isAdmin: userProfile.val().isAdmin,
            photo: userProfile.val().photo,
            username: userProfile.val().username,
            history: userProfile.val().history.includes(search, 0) ?  searchHistory : userProfile.val().history,
          };
        } else if (userProfile.val().history === undefined && userProfile.val().favorites !== undefined) {
          newUserProfile = {
            email: userProfile.val().email,
            isAdmin: userProfile.val().isAdmin,
            photo: userProfile.val().photo,
            username: userProfile.val().username,
            favorites: userProfile.val().favorites
          };
        } else {
          newUserProfile = {
            email: userProfile.val().email,
            isAdmin: userProfile.val().isAdmin,
            photo: userProfile.val().photo,
            username: userProfile.val().username,
          };
        }
      });
    }).catch(error => {
      console.log(error);
    });
    this.userProfile$.next(newUserProfile);
    return this.userProfilesRef.update(this.userID$.value, newUserProfile);
  }

  async clearSearchHistory() {
    let newUserProfile = {};
    let searchHistory = [];
    await this.getUserProfile(this.userID$.value).then(userProfile => {
      userProfile.forEach((userProfile) => {
        if (userProfile.val().history !== undefined && userProfile.val().favorites !== undefined) {
          newUserProfile = {
            email: userProfile.val().email,
            isAdmin: userProfile.val().isAdmin,
            photo: userProfile.val().photo,
            username: userProfile.val().username,
            history: [],
            favorites: userProfile.val().favorites
          };
        } else if (userProfile.val().history !== undefined && userProfile.val().favorites === undefined) {
          newUserProfile = {
            email: userProfile.val().email,
            isAdmin: userProfile.val().isAdmin,
            photo: userProfile.val().photo,
            username: userProfile.val().username,
            history: [],
          };
        } else if (userProfile.val().history === undefined && userProfile.val().favorites !== undefined) {
          newUserProfile = {
            email: userProfile.val().email,
            isAdmin: userProfile.val().isAdmin,
            photo: userProfile.val().photo,
            username: userProfile.val().username,
            favorites: userProfile.val().favorites
          };
        } else {
          newUserProfile = {
            email: userProfile.val().email,
            isAdmin: userProfile.val().isAdmin,
            photo: userProfile.val().photo,
            username: userProfile.val().username,
          };
        }
      });
    }).catch(error => {
      console.log(error);
    });
    this.userProfile$.next(newUserProfile);
    return this.userProfilesRef.update(this.userID$.value, newUserProfile);
  }

  async addToFavorites(search: string) {
    let newUserProfile = {};
    let favorites = [];
    await this.getUserProfile(this.userID$.value).then(userProfile => {
      userProfile.forEach((userProfile) => {
        if (userProfile.val().history !== undefined && userProfile.val().favorites !== undefined) {
          if (!userProfile.val().favorites.includes(search, 0)) {
            favorites = userProfile.val().favorites;
            favorites.push(search);
          }
          newUserProfile = {
            email: userProfile.val().email,
            isAdmin: userProfile.val().isAdmin,
            photo: userProfile.val().photo,
            username: userProfile.val().username,
            history:  userProfile.val().history,
            favorites: !userProfile.val().favorites.includes(search, 0) ?  favorites : userProfile.val().favorites
          };
        } else if (userProfile.val().history !== undefined && userProfile.val().favorites === undefined) {
          newUserProfile = {
            email: userProfile.val().email,
            isAdmin: userProfile.val().isAdmin,
            photo: userProfile.val().photo,
            username: userProfile.val().username,
            history: userProfile.val().history,
            favorites: [search]
          };
        } else if (userProfile.val().history === undefined && userProfile.val().favorites !== undefined) {
          if (!userProfile.val().favorites.includes(search, 0)) {
            favorites = userProfile.val().favorites;
            favorites.push(search);
          }
          newUserProfile = {
            email: userProfile.val().email,
            isAdmin: userProfile.val().isAdmin,
            photo: userProfile.val().photo,
            username: userProfile.val().username,
            favorites: !userProfile.val().favorites.includes(search, 0) ?  favorites : userProfile.val().favorites
          };
        } else {
          newUserProfile = {
            email: userProfile.val().email,
            isAdmin: userProfile.val().isAdmin,
            photo: userProfile.val().photo,
            username: userProfile.val().username,
            favorites: [search]
          };
        }
      });
    }).catch(error => {
      console.log(error);
    });
    this.userProfile$.next(newUserProfile);
    return this.userProfilesRef.update(this.userID$.value, newUserProfile);
  }

  async deleteFromFavorites(search: string) {
    let newUserProfile = {};
    let favorites = [];
    await this.getUserProfile(this.userID$.value).then(userProfile => {
      userProfile.forEach((userProfile) => {
        if (userProfile.val().history !== undefined && userProfile.val().favorites !== undefined) {
          if (userProfile.val().favorites.includes(search, 0)) {
            favorites = userProfile.val().favorites;
            favorites.splice(favorites.indexOf(search), 1)
          }
          newUserProfile = {
            email: userProfile.val().email,
            isAdmin: userProfile.val().isAdmin,
            photo: userProfile.val().photo,
            username: userProfile.val().username,
            history:  userProfile.val().history,
            favorites: userProfile.val().favorites.includes(search, 0) ?  favorites : userProfile.val().favorites
          };
        } else if (userProfile.val().history !== undefined && userProfile.val().favorites === undefined) {
          newUserProfile = {
            email: userProfile.val().email,
            isAdmin: userProfile.val().isAdmin,
            photo: userProfile.val().photo,
            username: userProfile.val().username,
            history: userProfile.val().history,
          };
        } else if (userProfile.val().history === undefined && userProfile.val().favorites !== undefined) {
          if (userProfile.val().favorites.includes(search, 0)) {
            favorites = userProfile.val().favorites;
            favorites.splice(favorites.indexOf(search), 1);
          }
          newUserProfile = {
            email: userProfile.val().email,
            isAdmin: userProfile.val().isAdmin,
            photo: userProfile.val().photo,
            username: userProfile.val().username,
            favorites: userProfile.val().favorites.includes(search, 0) ?  favorites : userProfile.val().favorites
          };
        } else {
          newUserProfile = {
            email: userProfile.val().email,
            isAdmin: userProfile.val().isAdmin,
            photo: userProfile.val().photo,
            username: userProfile.val().username,
          };
        }
      });
    }).catch(error => {
      console.log(error);
    });
    this.userProfile$.next(newUserProfile);
    return this.userProfilesRef.update(this.userID$.value, newUserProfile);
  }

  async clearFavorites() {
    let newUserProfile = {};
    let favorites = [];
    await this.getUserProfile(this.userID$.value).then(userProfile => {
      userProfile.forEach((userProfile) => {
        if (userProfile.val().history !== undefined && userProfile.val().favorites !== undefined) {
          newUserProfile = {
            email: userProfile.val().email,
            isAdmin: userProfile.val().isAdmin,
            photo: userProfile.val().photo,
            username: userProfile.val().username,
            history:  userProfile.val().history,
            favorites: []
          };
        } else if (userProfile.val().history !== undefined && userProfile.val().favorites === undefined) {
          newUserProfile = {
            email: userProfile.val().email,
            isAdmin: userProfile.val().isAdmin,
            photo: userProfile.val().photo,
            username: userProfile.val().username,
            history: userProfile.val().history,
          };
        } else if (userProfile.val().history === undefined && userProfile.val().favorites !== undefined) {
          newUserProfile = {
            email: userProfile.val().email,
            isAdmin: userProfile.val().isAdmin,
            photo: userProfile.val().photo,
            username: userProfile.val().username,
            favorites: []
          };
        } else {
          newUserProfile = {
            email: userProfile.val().email,
            isAdmin: userProfile.val().isAdmin,
            photo: userProfile.val().photo,
            username: userProfile.val().username,
          };
        }
      });
    }).catch(error => {
      console.log(error);
    });
    this.userProfile$.next(newUserProfile);
    return this.userProfilesRef.update(this.userID$.value, newUserProfile);
  }

}
