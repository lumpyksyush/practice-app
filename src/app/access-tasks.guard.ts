import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';

import { RegisterService } from './register.service';

@Injectable({
  providedIn: 'root',
})
export class AccessTasksGuard implements CanActivate {
  constructor(private registerService: RegisterService) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    return this.registerService.isLoggedIn;
  }
}
