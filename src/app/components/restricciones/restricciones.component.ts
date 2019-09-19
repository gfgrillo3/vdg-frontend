import { Component, OnInit } from '@angular/core';
import { RestriccionService } from '../../services/restricciones/restriccion.service';
import { RestriccionDTO } from 'src/app/models/restriccion-dto';
import OlMap from 'ol/Map';
import OlXYZ from 'ol/source/XYZ';
import OlTileLayer from 'ol/layer/Tile';
import OlView from 'ol/View';

import { fromLonLat } from 'ol/proj';

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
  map: OlMap;
  source: OlXYZ;
  layer: OlTileLayer;
  view: OlView;

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
    this.source = new OlXYZ({
      url: 'http://tile.osm.org/{z}/{x}/{y}.png'
    });

    this.layer = new OlTileLayer({
      source: this.source
    });

    this.view = new OlView({
      center: fromLonLat([this.longitud, this.latitud]),
      zoom: 17
    });

    this.map = new OlMap({
      target: 'map',
      layers: [this.layer],
      view: this.view
    });
  }
}
