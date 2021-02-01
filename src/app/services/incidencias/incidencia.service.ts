import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Incidencia } from 'src/app/models/incidencia';

@Injectable({
  providedIn: 'root'
})
export class IncidenciaService {

  incidencias: Incidencia[];
  readonly URL_API = 'http://vdg-back.herokuapp.com/Incidencia';

  constructor(private http: HttpClient) { }

  getIncidenciasPorTopico(topico: string, cant: number){
    return this.http.get(this.URL_API + '/' + topico + '/' + cant);
  }

  getIncidenciasPorRestriccion(idRestriccion: number, cant: number){
    return this.http.get(this.URL_API + '/' + idRestriccion + '/' + cant);
  }

}
