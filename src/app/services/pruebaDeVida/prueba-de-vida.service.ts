import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PruebaDeVida } from 'src/app/models/prueba-de-vida';

@Injectable({
  providedIn: 'root'
})
export class PruebaDeVidaService {

  readonly URL_API = 'http://localhost:9090/PruebaDeVida';

  constructor(private http: HttpClient) { }

  getPruevasDeVidaPersona(idPersona: number){
    return this.http.get(this.URL_API + '/' + idPersona);
  }

  postPruebaDeVida(pruevaDeVida: PruebaDeVida){
    console.log(pruevaDeVida);
    return this.http.post(this.URL_API, pruevaDeVida);
  }
}
