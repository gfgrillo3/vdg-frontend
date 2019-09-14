import { Component, OnInit } from '@angular/core';
import { Persona } from 'src/app/models/persona';
import { Usuario } from 'src/app/models/usuario';
import { Restriccion } from 'src/app/models/restriccion';
import { NgForm } from '@angular/forms';

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

  constructor() { }

  ngOnInit() {
  }


  agregarVictimario(){
    //ACA TRAIGO AL VICTIMARIO
    document.getElementById("labelVictimario").innerHTML =
    "Victimario: "+this.victimario.apellido+", "+this.victimario.nombre;
  }

  agregarDamnificada(){
    //ACA TRAIGO LA DAMNIFICADA
    document.getElementById("labelDamnificada").innerHTML =
    "Daminifacada: "+this.damnificada.apellido+", "+this.damnificada.nombre;

  }

  agregarAdministrativo(){
    //ACA TRAIGO EL ADM
    document.getElementById("labelAdministrativo").innerHTML =
    "Administrativo: "+this.administrativo.email;
  }

  agregarRestriccion(restriccionForm: NgForm){
    this.restriccion.idDamnificada = this.damnificada.idPersona;
    this.restriccion.idVictimario = this.victimario.idPersona;
    this.restriccion.idAdministrativo = this.administrativo.idUsuario;

    console.log(this.restriccion);
    document.getElementById("labelVictimario").innerHTML = "";
    document.getElementById("labelDamnificada").innerHTML = "";
    document.getElementById("labelAdministrativo").innerHTML = "";
  }

  confirm(){
    if(window.confirm("Are you sure to delete ")) {
      console.log("eliminar restriccion");
    }
  }

}
