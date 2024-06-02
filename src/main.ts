import { provideHttpClient } from "@angular/common/http";
import { APP_INITIALIZER } from "@angular/core";
import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from "@angular/router";
import { KeycloakService } from "keycloak-angular";
import { AppComponent } from './app/app.component';
import { routes } from "./app/app.routes";
import keycloakConfig from './assets/keycloak.json';

const keycloakService = new KeycloakService();

function keycloakInitializer(keycloak: KeycloakService) {
  return () => keycloak.init({

    config: {
      url: keycloakConfig['auth-server-url'],
      realm: keycloakConfig['realm'],
      clientId: keycloakConfig['resource']
    },
    initOptions: {
      onLoad: 'login-required'
    }

  });
}

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(),
    provideRouter(routes),
    {
      provide: APP_INITIALIZER,
      useFactory: keycloakInitializer,
      multi: true,
      deps: [KeycloakService]
    },
    { provide: KeycloakService, useValue: keycloakService }
  ]
}).catch(err => console.error(err));
