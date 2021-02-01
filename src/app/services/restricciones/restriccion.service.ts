import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Restriccion } from '../../models/restriccion';
import { RestriccionDTO } from 'src/app/models/restriccion-dto';

@Injectable({
  providedIn: 'root'
})
export class RestriccionService {

  restriccionSeleccionada: Restriccion;
  restricciones: RestriccionDTO[];  
  readonly URL_API = 'http://vdg-back.herokuapp.com/RestriccionPerimetral';

  constructor(private http:HttpClient) { 
    this.restriccionSeleccionada = new Restriccion();
  }

  getRestricciones(){
    return this.http.get("http://vdg-back.herokuapp.com/RestriccionDTO");
  }

  postRestriccion(restriccion: Restriccion){
    return this.http.post(this.URL_API, restriccion);
  }
  
  getRestriccionesAdministrativo(email: string){
    return this.http.get("http://vdg-back.herokuapp.com/RestriccionDTO/"+
    email);
  }

  putRestriccion(restriccion: Restriccion){
    return this.http.put(this.URL_API, restriccion);
  }

  deleteRestriccion(idRestriccion: number){
    return this.http.delete(this.URL_API + "/borrar/" + idRestriccion);
  }

}
