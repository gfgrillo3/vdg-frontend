import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Restriccion } from '../../models/restriccion';

@Injectable({
  providedIn: 'root'
})
export class RestriccionService {

  restriccionSeleccionada: Restriccion;
  restricciones: Restriccion[];
  readonly URL_API = 'http://localhost:9090/RestriccionPerimetral';

  constructor(private http:HttpClient) { 
    this.restriccionSeleccionada = new Restriccion();
  }

  getRestricciones(){
    return this.http.get(this.URL_API);
  }

  postRestriccion(restriccion: Restriccion){
    return this.http.post(this.URL_API, restriccion);
  }

}
