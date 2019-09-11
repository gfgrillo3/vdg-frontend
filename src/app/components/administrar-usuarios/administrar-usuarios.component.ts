import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/services/login/usuario.service';
import { Usuario } from 'src/app/models/usuario';

@Component({
  selector: 'app-administrar-usuarios',
  templateUrl: './administrar-usuarios.component.html',
  styleUrls: ['./administrar-usuarios.component.css']
})
export class AdministrarUsuariosComponent implements OnInit {

  constructor(private usuarioService: UsuarioService) { }

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

  editarUsuario(usuario: Usuario){
  }

  eliminarUsuario(){    
  }


}
