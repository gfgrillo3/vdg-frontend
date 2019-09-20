import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class IncidenciaService {

  readonly URL_API = 'http://localhost:9090/';

  constructor(private http: HttpClient) { }

  getIncidencias(){
    return this.http.get(this.URL_API + '');
  }

  getIncidenciasPorTopico(topico: string){
    return this.http.get(this.URL_API + '/' + topico);
  }

}
