import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PruebaDeVida } from 'src/app/models/prueba-de-vida';

@Injectable({
  providedIn: 'root'
})
export class PruebaDeVidaService {

  readonly URL_API = 'http://vdg-back.herokuapp.com/PruebaDeVida';

  constructor(private http: HttpClient) { }

  getPruevasDeVidaPersona(idPersona: number){
    return this.http.get(this.URL_API + '/' + idPersona);
  }

  postPruebaDeVida(pruebaDeVida: PruebaDeVida){
    console.log(pruebaDeVida);
    return this.http.post(this.URL_API, pruebaDeVida);
  }

  putPruebaDeVida(pruebaDeVida: PruebaDeVida){
    return this.http.put(this.URL_API + "/" + pruebaDeVida.idPruebaDeVida, pruebaDeVida);
  }

  
  getFotoPruebaDeVida(idPruebaDeVida: number){
    return this.http.get("http://vdg-back.herokuapp.com/FotoPruebaDeVida/getFotoPruebaDeVida/"+idPruebaDeVida); 
   }

}
