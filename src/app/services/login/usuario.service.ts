import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Usuario } from '../../models/usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  usuarioSeleccionado: Usuario;
  usuarios: Usuario[];
  readonly URL_API = 'https://vdg-back.herokuapp.com/Usuario';

  constructor(private http: HttpClient) {
    this.usuarioSeleccionado = new Usuario();
  }

  getUsuarios(){
    return this.http.get(this.URL_API);
  }

  postUsuario(usuario: Usuario){
    return this.http.post(this.URL_API, usuario);
  }
  
  deleteUsuario(id: number){
    return this.http.delete(this.URL_API + `/${id}`);
  }

  login(email: String, contrasena: String){
    const loginInfo = {};
    loginInfo["email"] = email;
    loginInfo["contrasena"] = contrasena;
    return this.http.post(this.URL_API+"/login", loginInfo);
  }

  getUsuarioByEmail(email: string){
    return this.http.get<Usuario>(this.URL_API+"/GetByEmail/"+email);
  }
}
