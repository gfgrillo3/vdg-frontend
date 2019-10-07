import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FotoIdentificacion } from 'src/app/models/foto-identificacion';

@Injectable({
  providedIn: 'root'
})
export class FotoIdentificacionService {

  fotoIdentificacion: FotoIdentificacion;
  readonly URL_API = 'https://vdg-back.herokuapp.com/FotoIdentificacion';


  constructor(private http: HttpClient) {
    this.fotoIdentificacion = new FotoIdentificacion;
  }

  postFotoIdentificacion(foto: FotoIdentificacion){
    console.log("La foto se agregara: " + foto);
    var fd = new FormData();
    fd.append("file", foto.foto);
    fd.append("idPersona", foto.idPersona.toString());
    return this.http.post(this.URL_API, fd);
  }

  postpr(datos64: string, idPersona: string){
    console.log("La foto se agregara BASE 64: " + datos64);
    var fd = new FormData();
    fd.append("foto", datos64);
    fd.append("idPersona", idPersona);
    return this.http.post(this.URL_API, fd);
  }
  
}
