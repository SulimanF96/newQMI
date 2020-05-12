import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class UserGuideGuard implements CanActivate {

  constructor(private router: Router, private storage: Storage) { }

  async canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Promise<boolean> {
    const isComplete = await this.storage.get('userGuideCompleted');

    if (!isComplete) {
      this.router.navigate(['user-guide']);
    }

    return isComplete;
  }
}
