import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/login/usuario.service';
import { Usuario } from '../../models/usuario';
import { NgForm} from '@angular/forms';
import { Router } from '@angular/router';
import * as sha256 from 'js-sha256';



@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css'],
  providers: [UsuarioService]
})
export class UsuarioComponent implements OnInit {

  loginEsInvalido = false;

  constructor(protected usuarioService: UsuarioService, private router: Router) { }

  ngOnInit() {
  }

  ingresar(usuarioForm: NgForm){
    if(usuarioForm.valid){
    var mail = usuarioForm.value.mail;
    var contrasena = sha256.sha256(usuarioForm.value.contrasena);
    var datosValidos;
    this.usuarioService.login(mail, contrasena)
      .subscribe(res => { 
        datosValidos = res;
        if(datosValidos){
          this.router.navigate(["/inicio"]);
          localStorage.setItem('emailUsuario', mail);
        }
        else
          this.setLoginInvalido();
      });   
  }
  }

  getUsuarios(){
    this.usuarioService.getUsuarios()
      .subscribe(res => {
        this.usuarioService.usuarios = res as Usuario[];
        console.log(res);
      })
  }

  setLoginInvalido(): void{
    this.loginEsInvalido = true;
    setTimeout(() => {
      this.loginEsInvalido = false;
    }, 5000);  
  }

}
