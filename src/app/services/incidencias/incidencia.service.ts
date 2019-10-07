import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Incidencia } from 'src/app/models/incidencia';

@Injectable({
  providedIn: 'root'
})
export class IncidenciaService {

  incidencias: Incidencia[];
  readonly URL_API = 'http://localhost:9090/Incidencia';

  constructor(private http: HttpClient) { }

  getIncidenciasPorTopico(topico: string){
    return this.http.get(this.URL_API + '/' + topico);
  }

  getIncidenciasPorRestriccion(idRestriccion: number){
    return this.http.get(this.URL_API + '/' + idRestriccion);
  }

}
