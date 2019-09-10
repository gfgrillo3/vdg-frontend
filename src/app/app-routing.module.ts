import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InicioComponent } from './components/inicio/inicio.component';
import { UsuarioComponent } from './components/usuario/usuario.component';
import { RestriccionesComponent } from './components/restricciones/restricciones.component';
import { NotificacionesComponent } from './components/notificaciones/notificaciones.component';
import { IncidenciasComponent } from './components/incidencias/incidencias.component';
import { PruebasDeVidaComponent } from './components/pruebas-de-vida/pruebas-de-vida.component';
import { AdministracionComponent } from './components/administracion/administracion.component';


const routes: Routes = [
  {
    path: 'inicio',
    component : InicioComponent,
    children:
    [
      { path: 'restricciones', component: RestriccionesComponent},
      { path: 'notificaciones', component: NotificacionesComponent},
      { path: 'incidencias', component: IncidenciasComponent},
      { path: 'pruebasDeVida', component: PruebasDeVidaComponent},
      { path: 'administracion', component: AdministracionComponent}
    ]
  },
  { path: 'ingresar', component: UsuarioComponent },
  { path: '', redirectTo: '/ingresar', pathMatch: 'full' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
