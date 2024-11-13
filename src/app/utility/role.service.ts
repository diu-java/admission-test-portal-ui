import { Injectable } from '@angular/core';
import {KeycloakService} from "keycloak-angular";

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  constructor(private keycloak: KeycloakService) { }
  hasRole(role: string): boolean {
    const userRoles = this.keycloak.getUserRoles();
    return userRoles.indexOf(role) !== -1;
  }
}
