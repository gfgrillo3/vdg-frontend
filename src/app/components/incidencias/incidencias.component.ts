import { Component, OnInit } from '@angular/core';
import { ComunicacionService } from 'src/app/services/comunicacion/comunicacion.service';
import { RestriccionDTO } from 'src/app/models/restriccion-dto';
import { IncidenciaService } from 'src/app/services/incidencias/incidencia.service';
import { Incidencia } from 'src/app/models/incidencia';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-incidencias',
  templateUrl: './incidencias.component.html',
  styleUrls: ['./incidencias.component.css']
})
export class IncidenciasComponent implements OnInit {

  restriccion: RestriccionDTO;
  incidencias: Incidencia[];

  constructor(private comunicacionServicio: ComunicacionService,
    private incideciaServicio: IncidenciaService,
    private spinnerService: NgxSpinnerService) { }

  ngOnInit() {
    this.getRestriccion();
    if(this.restriccion != null){
      this.getIncidenciasPorRestriccion(this.restriccion.restriccion.idRestriccion)
    }
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

  getIncidenciasPorRestriccion(idRestriccion: number) {
    this.spinnerService.show();
    this.incideciaServicio.getIncidenciasPorRestriccion(idRestriccion)
      .subscribe(res => {
        this.spinnerService.hide();
        this.incidencias = res as Incidencia[];
      });
  }

  getIncidenciasPorTopico(topico: string) {
    this.incideciaServicio.getIncidenciasPorTopico(topico)
      .subscribe(res => {
        this.incidencias = res as Incidencia[];
      });
  }

  seleccionarIncidencia(incidencia: Incidencia){
    document.getElementById("topico").innerHTML = " " + incidencia.topico;
    document.getElementById("fechaHora").innerHTML = " " + incidencia.fecha;
  }

}
