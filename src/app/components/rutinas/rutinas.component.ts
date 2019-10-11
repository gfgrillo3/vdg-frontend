import { Component, OnInit } from '@angular/core';
import { UbicacionService } from 'src/app/services/ubicaciones/ubicacion.service';
import { Ubicacion } from 'src/app/models/ubicacion';
import { ComunicacionService } from 'src/app/services/comunicacion/comunicacion.service';

@Component({
  selector: 'app-rutinas',
  templateUrl: './rutinas.component.html',
  styleUrls: ['./rutinas.component.css']
})
export class RutinasComponent implements OnInit {

  dias=['Lunes','Martes','Miércoles','Jueves','Viernes','Sábado','Domingo',];
  ubicacionPromedio: Ubicacion;

  constructor(private ubicacionService: UbicacionService, private comunicacion: ComunicacionService) { }

  ngOnInit() {
    //this.getUbicacionPromedio(this.comunicacion.restriccionDTO.victimario.idPersona,1,6,0);
    this.getUbicacionPromedio(this.comunicacion.restriccionDTO.victimario.idPersona,1,6,0);
  }

  getUbicacionPromedio(idPersona: number, dia: number, hora: number, minutos: number) {
    this.ubicacionService.getUbicacionPromedioRutina(idPersona, dia, hora, minutos)
      .subscribe(res => {
        this.ubicacionPromedio = res as Ubicacion;
        console.log(res);
      })
  }


}
