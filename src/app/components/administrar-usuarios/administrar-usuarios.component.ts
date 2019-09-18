import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/services/login/usuario.service';
import { Usuario } from 'src/app/models/usuario';
import { NgForm } from '@angular/forms';
import { ErrorDTO } from 'src/app/models/error-dto';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-administrar-usuarios',
  templateUrl: './administrar-usuarios.component.html',
  styleUrls: ['./administrar-usuarios.component.css']
})
export class AdministrarUsuariosComponent implements OnInit {

  roles;
  rolSeleccionado;
  usuarioSeleccionado = new Usuario;

  constructor(private usuarioService: UsuarioService, private toastr: ToastrService) {
    this.roles = ['SUPERVISOR', 'ADMINISTRATIVO'];
  }

  ngOnInit() {
    this.getUsuarios();
  }

  getUsuarios() {
    this.usuarioService.getUsuarios()
      .subscribe(res => {
        this.usuarioService.usuarios = res as Usuario[];
        console.log(res);
      })
  }

  agregarUsuario(usuarioForm: NgForm) {
    this.usuarioSeleccionado.rolDeUsuario = this.rolSeleccionado;
    //POR AHORA ESTA POR DEFECTO ESTA CONTRASEÑA EN EL MODEL
    this.usuarioService.postUsuario(this.usuarioSeleccionado)
      .subscribe(res => {
        var error = res as ErrorDTO;
        if (error.hayError) {
          //MOSTRAR ERROR
          //error.mensajeError
        }
        else {
          this.showToastr();
          console.log(this.usuarioSeleccionado);
          this.getUsuarios();
          usuarioForm.reset();
        }
      })
  }

  editarUsuario(usuario: Usuario) {
  }

  eliminarUsuario(idUsuario: number) {
    this.usuarioService.deleteUsuario(idUsuario)
      .subscribe(res => {
        var error = res as ErrorDTO;
        if (error.hayError) {
          //MOSTRAR ERROR
          //error.mensajeError
          this.toastr.error("" + error.mensajeError, "Error!");
        }
        else {
          this.toastr.success('Usuario eliminado correctamente', 'Toastr fun!');
          this.getUsuarios();
        }
      });
  }

  showToastr() {
    this.toastr.success('Hello', 'Toastr fun!');
  }
}
