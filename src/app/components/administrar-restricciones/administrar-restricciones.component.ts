import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-administrar-restricciones',
  templateUrl: './administrar-restricciones.component.html',
  styleUrls: ['./administrar-restricciones.component.css']
})
export class AdministrarRestriccionesComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }


  agregarVictimario(){
    document.getElementById("labelVictimario").innerHTML = "Victimario: ";
  }

  agregarDamnificada(){
    document.getElementById("labelDamnificada").innerHTML = "Daminifacada: ";

  }

  agregarAdministrativo(){
    document.getElementById("labelAdministrativo").innerHTML = "Administrativo: ";
  }

  agregarRestriccion(){
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
