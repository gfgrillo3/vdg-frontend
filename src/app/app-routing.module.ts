import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InicioComponent } from './inicio/inicio.component';
import { UsuarioComponent } from './usuario/usuario.component';
import { RestriccionesComponent } from './restricciones/restricciones.component';
import { NotificacionesComponent } from './notificaciones/notificaciones.component';


const routes: Routes = [
  {
    path: 'inicio',
    component : InicioComponent,
    children:
    [
      { path: 'restricciones', component: RestriccionesComponent},
      { path: 'notificaciones', component: NotificacionesComponent}
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
