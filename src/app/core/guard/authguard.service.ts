import { Injectable } from '@angular/core';
import { CanActivate , Router} from '@angular/router';
import { TokenStorageService } from '../token-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private tokenService: TokenStorageService, private router: Router){};
  
  canActivate() {
      console.log('CanActivate called');
debugger;
    if (this.tokenService.isLoggedIn()){
        this.router.navigate(['./employee/list']);
        return true;
    } else {
      this.router.navigate(['./login']);
        return false;
    }
  }
  
}