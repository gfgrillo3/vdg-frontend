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
import { UbicacionService } from 'src/app/services/ubicaciones/ubicacion.service';
import { Ubicacion } from 'src/app/models/ubicacion';
import { UbicacionDto } from 'src/app/models/ubicacion-dto';

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
  vectorUbicaciones: VectorSource;
  capaUbicaciones: VectorLayer;

  ubicacionVictimario: Ubicacion;
  ubicacionDamnificada: Ubicacion;
  ubicacionDto: UbicacionDto;


  constructor(private restriccionService: RestriccionService, private comunicacion: ComunicacionService,
    private ubicacionService: UbicacionService) { }

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

  seleccionarRestriccion(restriccion: RestriccionDTO) {
    this.comunicacion.enviarRestriccion(restriccion);
    this.mostrarRestriccion();
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

  mostrarRestriccion() {
    var markerVictimario: Feature;
    var markerDamnificada: Feature;
    var perimetro: Feature;

    //GET UBICACIONES Y SET the this.ubicaciones
    this.ubicacionService.getUbicacionesRestriccion(this.comunicacion.restriccionDTO.restriccion.idRestriccion)
    .subscribe(res => {

      this.ubicacionDto = res as UbicacionDto;
      this.ubicacionDamnificada = this.ubicacionDto.ubicacionDamnificada;
      this.ubicacionVictimario = this.ubicacionDto.ubicacionVictimario;

      
    //Marco Ubicaciones en Mapa
    //Marco Victimario con su marker La longitud y latitud es de objeto Ubicacion
    markerVictimario = new Feature({
      geometry: new Point(fromLonLat([this.ubicacionVictimario.longitud, this.ubicacionVictimario.latitud]))
    });
    markerVictimario.setStyle(new Style({
      image: new Icon(({
        src: 'assets/markerVictimario.png',
        imgSize: [60, 60]
      }))
    }));

    //Marco Damnificada con su marker La longitud y latitud es de objeto Ubicacion
    markerDamnificada = new Feature({
      geometry: new Point(fromLonLat([this.ubicacionDamnificada.longitud, this.ubicacionDamnificada.latitud]))
    });
    markerDamnificada.setStyle(new Style({
      image: new Icon(({
        src: 'assets/markerDamnificada.png',
        imgSize: [60, 60]
      }))
    }));

    //Dibujo Circulo y le aplico un estilo 
    perimetro = new Feature();
    var forma = new Circle(fromLonLat([this.ubicacionDamnificada.longitud, this.ubicacionDamnificada.latitud]));
    forma.setRadius(this.comunicacion.restriccionDTO.restriccion.distancia);
    perimetro.setGeometry(forma);
    this.pintarPerimetro(perimetro);

    //Borro lo dibujado anteriormente en el mapa
    var layers = this.map.getLayers().getArray();
    for (var i = layers.length - 1; i >= 1; --i) {
      var layer = layers[i];
      this.map.removeLayer(layer);
    }

    //Creo el vector y capa para mostrar las ubicaciones
    this.vectorUbicaciones = new VectorSource({
      features: [markerVictimario, markerDamnificada, perimetro]
    });
    this.capaUbicaciones = new VectorLayer({
      source: this.vectorUbicaciones
    });

    //CENTRO EL MAPA EN LA UBICACION DE LA DAMNIFICADA
    this.vistaMapa.setCenter(fromLonLat([this.ubicacionDamnificada.longitud, this.ubicacionDamnificada.latitud]));

    //BORRAR ESTE IF ELSE LUEGO DE LA PRESENTACIÓN
    /*
    if (this.comunicacion.restriccionDTO.restriccion.idRestriccion == 1) {
      this.vectorUbicaciones = new VectorSource({
        features: [markerVictimario, markerDamnificada, perimetro]
      });
      this.capaUbicaciones = new VectorLayer({
        source: this.vectorUbicaciones
      });
      this.vistaMapa.setCenter(fromLonLat([this.longitud, this.latitud]));
    }
    else {
      this.vectorUbicaciones = new VectorSource({
        features: [markerVictimario2, markerDamnificada2, perimetro2]
      });
      this.capaUbicaciones = new VectorLayer({
        source: this.vectorUbicaciones
      });
      this.vistaMapa.setCenter(fromLonLat([this.longitud-0.006877, this.latitud- 0.002745]));
    }
    //BORRAR HASTA ACA EL IF
    */
    this.map.addLayer(this.capaUbicaciones);


    });
    
    
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

  //ESTE METODO BORRARLO LUEGO DE LA ENTREGA
  pintarPerimetroDeRojo(perimetro) {
    //Pinto el perimetro dependiendo si infringe o no
    var style = new Style({ fill: new Fill({}) });
    style.getFill().setColor([255, 0, 0, .4]);
    perimetro.setStyle(style);
  }
  //HASTA ACA SE BORRA EL METODO
}
