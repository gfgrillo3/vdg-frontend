import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UsuarioComponent } from './usuario/usuario.component';
import { InicioComponent } from './inicio/inicio.component';
import { NavComponent } from './nav/nav.component';
import { RestriccionesComponent } from './restricciones/restricciones.component';
import { NotificacionesComponent } from './notificaciones/notificaciones.component';

@NgModule({
  declarations: [
    AppComponent,
    UsuarioComponent,
    InicioComponent,
    NavComponent,
    RestriccionesComponent,
    NotificacionesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
