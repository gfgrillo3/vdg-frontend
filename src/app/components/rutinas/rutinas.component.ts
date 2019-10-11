import { Component, OnInit } from '@angular/core';
import { UbicacionService } from 'src/app/services/ubicaciones/ubicacion.service';
import { Ubicacion } from 'src/app/models/ubicacion';
import { ComunicacionService } from 'src/app/services/comunicacion/comunicacion.service';
import OlMap from 'ol/Map';
import OlXYZ from 'ol/source/XYZ';
import OlTileLayer from 'ol/layer/Tile';
import OlView from 'ol/View';
import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';
import VectorSource from 'ol/source/Vector';
import { Vector as VectorLayer } from 'ol/layer';
import { Icon, Style, Stroke, Fill } from 'ol/style';
import { Circle } from 'ol/geom';
import { fromLonLat } from 'ol/proj';

@Component({
  selector: 'app-rutinas',
  templateUrl: './rutinas.component.html',
  styleUrls: ['./rutinas.component.css']
})
export class RutinasComponent implements OnInit {

  dias=['Lunes','Martes','Miércoles','Jueves','Viernes','Sábado','Domingo',];
  ubicacionPromedio: Ubicacion;
  minutos=['00','30'];

  //VARIABLES PARA EL MAPA
  map: OlMap;
  mapSource: OlXYZ;
  capaMapa: OlTileLayer;
  vistaMapa: OlView;
  vectorUbicaciones: VectorSource;
  capaUbicaciones: VectorLayer;


  constructor(private ubicacionService: UbicacionService, private comunicacion: ComunicacionService) { }

  ngOnInit() {
    //this.getUbicacionPromedio(this.comunicacion.restriccionDTO.victimario.idPersona,1,6,0);
    this.getUbicacionPromedio(1,1,6,0);
    this.iniciarMapa();
  }

  iniciarMapa() {
    //Fuente del mapa,
    this.mapSource = new OlXYZ({
      url: 'http://tile.osm.org/{z}/{x}/{y}.png'
    });

    //Capa para mostrar el mapa
    this.capaMapa = new OlTileLayer({
      source: this.mapSource
    });

    //Centro el mapa en la UNGS O en cualquier lado
    this.vistaMapa = new OlView({
      center: fromLonLat([-58.700233, -34.522249]),
      zoom: 17
    });

    //Creo el mapa con las capas y la vista
    this.map = new OlMap({
      target: 'map',
      layers: [this.capaMapa],
      view: this.vistaMapa
    });
  }

  getRutina(){
  //UbicacionService getUbicacionRutina
  }

  mostrarRutina(){
    //LLENAR EL MAPA
  }

  getUbicacionPromedio(idPersona: number, dia: number, hora: number, minutos: number) {
    this.ubicacionService.getUbicacionPromedioRutina(idPersona, dia, hora, minutos)
      .subscribe(res => {
        this.ubicacionPromedio = res as Ubicacion;
        console.log(res);
      })
  }


}
