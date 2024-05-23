import { APP_INITIALIZER } from '@angular/core';
import { RouterModule } from '@angular/router';
import { routes } from './app.routes';
import { KeycloakService } from 'keycloak-angular';

function initializeKeycloak(keycloak: KeycloakService) {
  return () =>
    keycloak.init({
      config: {
        url: 'http://localhost:8081',
        realm: 'msp',
        clientId: 'msp'
      },
      initOptions: {
        onLoad: 'login-required',
        silentCheckSsoRedirectUri:
          window.location.origin + 'src/assets/silent-check-sso.html'
      }
    });
}

export const appConfig = [
  RouterModule.forRoot(routes),
  {
    provide: APP_INITIALIZER,
    useFactory: initializeKeycloak,
    multi: true,
    deps: [KeycloakService]
  },
  KeycloakService
];
