import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UbicacionService {

  readonly URL_API = 'http://localhost:9090/Ubicacion';

  constructor(private http: HttpClient) { }

  getUbicacionPersona(idPersona: number){
    return this.http.get(this.URL_API + "/" + idPersona);
  }

}
