import { Component, OnInit } from '@angular/core';
import { RestriccionService } from '../../services/restricciones/restriccion.service';
import { RestriccionDTO } from 'src/app/models/restriccion-dto';
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
import { Restriccion } from 'src/app/models/restriccion';
import { ComunicacionService } from 'src/app/services/comunicacion/comunicacion.service';

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
  mapSource: OlXYZ;
  capaMapa: OlTileLayer;
  vistaMapa: OlView;
  ubicacionVictimario; //: Ubicacion;
  ubicacionDamnificada; //: Ubicacion;
  
  constructor(private restriccionService: RestriccionService, private comunicacion: ComunicacionService) { }

  ngOnInit() {
    this.getRestricciones(localStorage.getItem("emailUsuario"));
    this.iniciarMapa();
  }

  getRestricciones(email: string) {
    this.restriccionService.getRestriccionesAdministrativo(email)
      .subscribe(res => {
        this.restriccionService.restricciones = res as RestriccionDTO[];
        console.log(res);
      })
  }

  seleccionarRestriccion(restriccion: RestriccionDTO){
    this.comunicacion.enviarRestriccion(restriccion);
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
      center: fromLonLat([this.longitud, this.latitud]),
      zoom: 17
    });


    //Creo el mapa con las capas y la vista
    this.map = new OlMap({
      target: 'map',
      layers: [this.capaMapa],
      view: this.vistaMapa
    });

    this.mostrarRestriccion();
  }

  mostrarRestriccion() {
    var markerVictimario: Feature;
    var markerDamnificada: Feature;
    var vectorUbicaciones: VectorSource;
    var capaUbicaciones: VectorLayer;
    var perimetro: Feature;

    //GET UBICACIONES Y SET the this.ubicaciones

    //Marco Ubicaciones en Mapa
    //Marco Victimario con su marker La longitud y latitud es de objeto Ubicacion
    markerVictimario = new Feature({
      geometry: new Point(fromLonLat([this.longitud, this.latitud + 0.0010]))
    });
    markerVictimario.setStyle(new Style({
      image: new Icon(({
        src: 'assets/markerVictimario.png',
        imgSize: [60, 60]
      }))
    }));

    //Marco Damnificada con su marker La longitud y latitud es de objeto Ubicacion
    markerDamnificada = new Feature({
      geometry: new Point(fromLonLat([this.longitud, this.latitud]))
    });
    markerDamnificada.setStyle(new Style({
      image: new Icon(({
        src: 'assets/markerDamnificada.png',
        imgSize: [60, 60]
      }))
    }));

    //Dibujo Circulo y le aplico un estilo longitud y latitud por ubicacionVictima
    //Radio por distancia infracción.
    perimetro = new Feature();
    var forma = new Circle(fromLonLat([this.longitud, this.latitud]));
    forma.setRadius(100);
    perimetro.setGeometry(forma);
    this.pintarPerimetro(perimetro);

    //Creo el vector y capa para mostrar las ubicaciones 
    vectorUbicaciones = new VectorSource({
      features: [markerVictimario, markerDamnificada, perimetro]
    });
    capaUbicaciones = new VectorLayer({
      source: vectorUbicaciones
    });

    //Agrego la capa al mapa
    this.map.addLayer(capaUbicaciones);
  }

  pintarPerimetro(perimetro) {
    //Pinto el perimetro dependiendo si infringe o no
    var style = new Style({ fill: new Fill({}) });
    //if(EstaInfringiendo)
    style.getFill().setColor([0, 255, 0, .4]);
    //else
    //style.getFill().setColor([255, 0, 0, .4]);
  
    perimetro.setStyle(style);
  }

}
