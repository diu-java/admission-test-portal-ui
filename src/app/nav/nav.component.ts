import {Component, OnInit, Renderer2} from '@angular/core';
import {RoleService} from "../utility/role.service";
import {KeycloakService} from "keycloak-angular";
import {environment} from "../../environment/environment";
declare var $: any;
@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit{
  isAdmissionSetupExpanded:boolean = false;
  constructor(private roleService: RoleService, private keycloakService: KeycloakService, private renderer: Renderer2) {
  }
  ngOnInit(): void {
    this.menuCheck();
  }
  menuCheck() {
    $('#sidebar_menu').metisMenu();
    const sidebarMenu = document.getElementById('sidebar_menu');
    if (sidebarMenu) {
      this.renderer.listen(sidebarMenu, 'click', () => {
        $('.sidebar').removeClass('active_sidebar');
      });
    }
  }

  menuRoleAccess(role: any){
    return this.roleService.hasRole(role);
  }

  logout() {
    this.keycloakService.logout(environment.sso_logout_url);
  }
  toggleAdmissionSetup(event: Event) {
    event.preventDefault();
    this.isAdmissionSetupExpanded = !this.isAdmissionSetupExpanded;
  }
}
