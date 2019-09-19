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
import {Vector as VectorLayer} from 'ol/layer';
import {Icon, Style, Stroke, Fill} from 'ol/style';
import {Circle} from 'ol/geom';


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
  victimarioUbi;
  vectorSource;
  vectorLayer;
  rasterLayer;

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

    //Capa para mostrar el mapa
    this.layer = new OlTileLayer({
      source: this.source
    });

    //Centro el mapa en la UNGS
    this.view = new OlView({
      center: fromLonLat([this.longitud, this.latitud]),
      zoom: 17
    });

   //Ubicacion del victimario. Marco con un punto 
   this.victimarioUbi = new Feature({
    geometry: new Point(fromLonLat([this.longitud, this.latitud]))
  });
  this.victimarioUbi.setStyle(new Style({
    image: new Icon(({
      src: 'assets/ubiPersonaIcon.svg',
      imgSize: [60, 60]
    }))
  }));
  
//Dibujo Circulo y le aplico un estilo
var feature = new Feature();
var geom = new Circle(fromLonLat([this.longitud, this.latitud]));
geom.setRadius(100);
feature.setGeometry(geom);

var style = new Style({
  fill: new Fill({
      color: [0, 255, 0, .4]
  })
});
feature.setStyle(style);

  //Creo el vector para mostrar al victimario y la capa para el mapa
  this.vectorSource = new VectorSource({
    features: [this.victimarioUbi, feature]
  });
  this.vectorLayer = new VectorLayer({
    source: this.vectorSource
  });
  
  //Creo el mapa con las capas y la vista
  this.map = new OlMap({
    target: 'map',
    layers: [ this.layer, this.vectorLayer ],
    view: this.view
  });
  
  }
  
}
