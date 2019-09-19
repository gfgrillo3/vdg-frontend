import { Component, OnInit } from '@angular/core';
import { RestriccionService } from '../../services/restricciones/restriccion.service';
import { RestriccionDTO } from 'src/app/models/restriccion-dto';
declare var ol: any;

@Component({
  selector: 'app-restricciones',
  templateUrl: './restricciones.component.html',
  styleUrls: ['./restricciones.component.css'],
  providers: [RestriccionService]
})
export class RestriccionesComponent implements OnInit {
  
  //Latitud y longitud centrada en la UNGS
  latitud: number = -34.522249;
  longitud: number = -58.700233;
  map: any;

  constructor(private restriccionService : RestriccionService) { }

  ngOnInit() {
    this.getRestricciones(localStorage.getItem("emailUsuario"));
    this.iniciarMapa();
  }

  getRestricciones(email: string){
   this.restriccionService.getRestriccionesAdministrativo(email)
   .subscribe(res =>  {
     this.restriccionService.restricciones = res as RestriccionDTO[];
     console.log(res);
   })
  }

  iniciarMapa(){
    this.map = new ol.Map({
      target: 'map',
      layers: [
        new ol.layer.Tile({
          source: new ol.source.OSM()
        })
      ],
      view: new ol.View({
        center: ol.proj.fromLonLat([this.longitud, this.latitud]),
        zoom: 18
      })
    });
  }
}
