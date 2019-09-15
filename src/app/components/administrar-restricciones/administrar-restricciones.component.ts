import { Component, OnInit } from '@angular/core';
import { Persona } from 'src/app/models/persona';
import { Usuario } from 'src/app/models/usuario';
import { Restriccion } from 'src/app/models/restriccion';
import { NgForm } from '@angular/forms';
import { RestriccionService } from 'src/app/services/restricciones/restriccion.service';
import { PersonaService } from 'src/app/services/personas/persona.service';
import { UsuarioService } from 'src/app/services/login/usuario.service';

@Component({
  selector: 'app-administrar-restricciones',
  templateUrl: './administrar-restricciones.component.html',
  styleUrls: ['./administrar-restricciones.component.css']
})
export class AdministrarRestriccionesComponent implements OnInit {

  damnificada = new Persona;
  victimario = new Persona;
  administrativo = new Usuario;
  restriccion = new Restriccion;

  constructor(private restriccionService: RestriccionService,
    private personaService: PersonaService,
    private usuarioService: UsuarioService) { }

  ngOnInit() {
  }


  agregarVictimario() {
    //ACA TRAIGO AL VICTIMARIO
    document.getElementById("labelVictimario").innerHTML =
      "Victimario: " + this.victimario.apellido + ", " + this.victimario.nombre;
  }

  agregarDamnificada() {
    //ACA TRAIGO LA DAMNIFICADA
    document.getElementById("labelDamnificada").innerHTML =
      "Daminifacada: " + this.damnificada.apellido + ", " + this.damnificada.nombre;

  }

  agregarAdministrativo() {
    //ACA TRAIGO EL ADM
    document.getElementById("labelAdministrativo").innerHTML =
      "Administrativo: " + this.administrativo.email;
  }

  agregarRestriccion(restriccionForm: NgForm) {
    this.restriccion.idDamnificada = this.damnificada.idPersona;
    this.restriccion.idVictimario = this.victimario.idPersona;
    this.restriccion.idUsuario = this.administrativo.idUsuario;

    let ngbDate = restriccionForm.value.dp;
    let myDate = new Date(ngbDate.year, ngbDate.month - 1, ngbDate.day);
    this.restriccion.fechaSentencia = myDate;

    this.restriccionService.postRestriccion(this.restriccion)
      .subscribe(res => {
        console.log("Restricción agregada correctamente");
        restriccionForm.reset();
      })

      document.getElementById("labelVictimario").innerHTML = "";
      document.getElementById("labelDamnificada").innerHTML = "";
      document.getElementById("labelAdministrativo").innerHTML = "";

      console.log(this.restriccion);

  }

  confirm() {
    if (window.confirm("Are you sure to delete ")) {
      console.log("eliminar restriccion");
    }
  }

}
