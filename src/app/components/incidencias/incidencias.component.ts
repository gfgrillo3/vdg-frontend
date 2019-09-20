import { Component, OnInit } from '@angular/core';
import { ComunicacionService } from 'src/app/services/comunicacion/comunicacion.service';
import { RestriccionDTO } from 'src/app/models/restriccion-dto';
import { IncidenciaService } from 'src/app/services/incidencias/incidencia.service';
import { Incidencia } from 'src/app/models/incidencia';

@Component({
  selector: 'app-incidencias',
  templateUrl: './incidencias.component.html',
  styleUrls: ['./incidencias.component.css']
})
export class IncidenciasComponent implements OnInit {

  restriccion: RestriccionDTO;
  incidencias;

  constructor(private comunicacionServicio: ComunicacionService,
    private incideciaServicio: IncidenciaService) { }

  ngOnInit() {
    this.getRestriccion();
  }

  getRestriccion() {
    this.restriccion = this.comunicacionServicio.restriccionDTO;
    if (this.restriccion != null) {
      document.getElementById("restriccionSeleccionada").innerHTML = ""
        + this.restriccion.victimario.apellido + ", " + this.restriccion.victimario.nombre +
        " - "
        + this.restriccion.damnificada.apellido + ", " + this.restriccion.damnificada.nombre;
    }
  }

  getIncidencias() {
    this.incideciaServicio.getIncidencias()
      .subscribe(res => {
        this.incidencias = res as Incidencia[];
      });
  }

  getIncidenciasPorTopico(topico: string) {
    this.incideciaServicio.getIncidenciasPorTopico(topico)
      .subscribe(res => {
        this.incidencias = res as Incidencia[];
      });
  }

  seleccionarIncidencia(){
    document.getElementById("topico").innerHTML = "Infracción";
    document.getElementById("fechaHora").innerHTML = "20/9/2019";
  }

}
