import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InicioComponent } from './components/inicio/inicio.component';
import { UsuarioComponent } from './components/usuario/usuario.component';
import { RestriccionesComponent } from './components/restricciones/restricciones.component';
import { NotificacionesComponent } from './components/notificaciones/notificaciones.component';
import { IncidenciasComponent } from './components/incidencias/incidencias.component';
import { PruebasDeVidaComponent } from './components/pruebas-de-vida/pruebas-de-vida.component';
import { AdministrarRestriccionesComponent } from './components/administrar-restricciones/administrar-restricciones.component';
import { AdministrarUsuariosComponent } from './components/administrar-usuarios/administrar-usuarios.component';
import { AdministrarPersonasComponent } from './components/administrar-personas/administrar-personas.component';
import { RutinasComponent } from './components/rutinas/rutinas.component';


const routes: Routes = [
  {
    path: 'inicio',
    component : InicioComponent,
    children:
    [
      //{ path: '', redirectTo: 'restricciones', pathMatch: 'full' },
      { path: 'restricciones', component: RestriccionesComponent},
      { path: 'notificaciones', component: NotificacionesComponent},
      { path: 'incidencias', component: IncidenciasComponent},
      { path: 'pruebasDeVida', component: PruebasDeVidaComponent},
      { path: 'rutinas', component: RutinasComponent},
      { path: 'administrarPersonas', component: AdministrarPersonasComponent },
      { path: 'administrarUsuarios', component: AdministrarUsuariosComponent },
      { path: 'administrarRestricciones', component: AdministrarRestriccionesComponent }
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
