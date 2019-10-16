import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProvinciaLocalidadService {

  readonly URL_API = 'http://localhost:9090/';

  constructor(private http: HttpClient) { }

  getProvincias(){
    return this.http.get(this.URL_API + 'Provincias');
  }

  getLocalidades(idProvincia: number){
    return this.http.get(this.URL_API + 'Localidad/' + idProvincia);
  }
}
