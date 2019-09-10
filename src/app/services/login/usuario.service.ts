import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Usuario } from '../../models/usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  usuarioSeleccionado: Usuario;
  usuarios: Usuario[];

  constructor(private http: HttpClient) {
    this.usuarioSeleccionado = new Usuario();
  }

  getUsuarios(){
    return this.http.get("http://localhost:9090/usuarios")
  }

}
