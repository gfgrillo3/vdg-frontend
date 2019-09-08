import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UsuarioComponent } from './usuario/usuario.component';
import { InicioComponent } from './inicio/inicio.component';
import { NavComponent } from './nav/nav.component';
import { RestriccionesComponent } from './restricciones/restricciones.component';
import { NotificacionesComponent } from './notificaciones/notificaciones.component';
import { IncidenciasComponent } from './incidencias/incidencias.component';
import { PruebasDeVidaComponent } from './pruebas-de-vida/pruebas-de-vida.component';
import { AdministracionComponent } from './administracion/administracion.component';

@NgModule({
  declarations: [
    AppComponent,
    UsuarioComponent,
    InicioComponent,
    NavComponent,
    RestriccionesComponent,
    NotificacionesComponent,
    IncidenciasComponent,
    PruebasDeVidaComponent,
    AdministracionComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
