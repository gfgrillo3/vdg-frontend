import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/services/login/usuario.service';
import { Usuario } from 'src/app/models/usuario';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-administrar-usuarios',
  templateUrl: './administrar-usuarios.component.html',
  styleUrls: ['./administrar-usuarios.component.css']
})
export class AdministrarUsuariosComponent implements OnInit {

  roles;
  seleccionado;

  constructor(private usuarioService: UsuarioService) {
    this.roles = ['SUPERVISOR','ADMINISTRATIVO','DAMNIFICADA','VICTIMARIO'];
  }

  ngOnInit() {
    this.getUsuarios();
  }

  getUsuarios(){
    this.usuarioService.getUsuarios()
      .subscribe(res => {
        this.usuarioService.usuarios = res as Usuario[];
        console.log(res);
      })
  }

  agregarUsuario(usuarioForm: NgForm){
    let usuarioNuevo = new Usuario;
    usuarioNuevo.email = usuarioForm.value.email;
    usuarioNuevo.rolDeUsuario = this.seleccionado;
    //POR AHORA ESTA POR DEFECTO ESTA CONTRASEÑA
    usuarioNuevo.contrasena = "123";
    this.usuarioService.postUsuario(usuarioNuevo)
      .subscribe(res => {
        console.log(usuarioNuevo);
        this.getUsuarios();
        usuarioForm.reset();
      })
  }

  editarUsuario(usuario: Usuario){
  }

  eliminarUsuario(idUsuario: number){
    this.usuarioService.deleteUsuario(idUsuario)
      .subscribe(res => {
        console.log("Usuario eliminado");
        this.getUsuarios();
      });
  }
}
