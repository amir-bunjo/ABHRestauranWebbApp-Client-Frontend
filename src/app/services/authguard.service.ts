import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot ,CanActivate} from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AuthguardService implements CanActivate {

  constructor(private router: Router,private authService: AuthenticationService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this.authService.isUserLoggedIn())
      return true;

    this.router.navigate(['login']);
    return false;

  }

  canActivateChild(route: ActivatedRouteSnapshot, 
    state: RouterStateSnapshot): boolean {

    const userRoles: string = this.authService.getRoles();  // <--------- get the current user's roles
    const routeRoles: string[] = route.data['roles'];   // <------- Will get the roles arry you defined in your router config
  return true;
 /*
   Now you can do your logic to determine if the user has the appropriate role.
   If they do return true
   Else use router to set a redirect route to /user url or whereever you feel like and return false;
 */

}
}
