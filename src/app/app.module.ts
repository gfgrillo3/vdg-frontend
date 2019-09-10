import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UsuarioComponent } from './components/usuario/usuario.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { NavComponent } from './components/nav/nav.component';
import { RestriccionesComponent } from './components/restricciones/restricciones.component';
import { NotificacionesComponent } from './components/notificaciones/notificaciones.component';
import { IncidenciasComponent } from './components/incidencias/incidencias.component';
import { PruebasDeVidaComponent } from './components/pruebas-de-vida/pruebas-de-vida.component';
import { AdministracionComponent } from './components/administracion/administracion.component';

import { FormsModule } from '@angular/forms';
import { HttpClientModule} from '@angular/common/http';

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
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
