import {KeycloakService} from "keycloak-angular";
import {environment} from "../../environment/environment";

export function initializeKeycloak(keycloak:KeycloakService){
  return () =>
    keycloak.init({
      config: {
        url: environment.sso_url,
        realm: environment.sso_realm,
        clientId: environment.sso_clientId,
      },

      initOptions: {
        // checkLoginIframeInterval: 25,
        onLoad: 'check-sso',
        checkLoginIframe: false,
      },
      loadUserProfileAtStartUp: true,
    });
}
