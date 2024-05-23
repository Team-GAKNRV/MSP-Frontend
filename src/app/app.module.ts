import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from "@angular/common/http";
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { NavBarComponent } from "./components/nav-bar/nav-bar.component";
import { AuthGuard } from './guard/auth.guard';
import { KeycloakService } from 'keycloak-angular';
import { routes } from './app.routes';

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

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    NavBarComponent,
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
  ],
  providers: [
    AuthGuard,
    KeycloakService,
    {
      provide: APP_INITIALIZER,
      useFactory: initializeKeycloak,
      multi: true,
      deps: [KeycloakService]
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
