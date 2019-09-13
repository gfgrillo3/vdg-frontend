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
  rolSeleccionado;
  usuarioSeleccionado = new Usuario;

  constructor(private usuarioService: UsuarioService) {
    this.roles = ['SUPERVISOR','ADMINISTRATIVO'];
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
    this.usuarioSeleccionado.rolDeUsuario = this.rolSeleccionado;
    //POR AHORA ESTA POR DEFECTO ESTA CONTRASEÑA EN EL MODEL
    this.usuarioService.postUsuario(this.usuarioSeleccionado)
      .subscribe(res => {
        console.log(this.usuarioSeleccionado);
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
