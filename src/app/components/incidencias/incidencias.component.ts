import { Component, OnInit } from '@angular/core';
import { ComunicacionService } from 'src/app/services/comunicacion/comunicacion.service';
import { RestriccionDTO } from 'src/app/models/restriccion-dto';

@Component({
  selector: 'app-incidencias',
  templateUrl: './incidencias.component.html',
  styleUrls: ['./incidencias.component.css']
})
export class IncidenciasComponent implements OnInit {

  restriccion: RestriccionDTO;

  constructor(private comunicacionServicio: ComunicacionService) { }

  ngOnInit() {
    this.restriccion = this.comunicacionServicio.restriccionDTO;
    if(this.restriccion!=null){
      document.getElementById("restriccionSeleccionada").innerHTML = ""
        + this.restriccion.victimario.apellido + ", " + this.restriccion.victimario.nombre +
         " - "
        + this.restriccion.damnificada.apellido + ", " + this.restriccion.damnificada.nombre;
    }
  }

}
