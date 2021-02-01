import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Notificacion } from 'src/app/models/notificacion';

@Injectable({
  providedIn: 'root'
})
export class NotificacionService {

  readonly URL_API = 'http://vdg-back.herokuapp.com/Notificacion';

  constructor(private http: HttpClient) { }

  getNotificacionesArchivadas(idAdm: number, cant: number){
    return this.http.get(this.URL_API + '/getArchivadas/' + idAdm+"/"+cant);
  }

  getNotificacionesNoArchivadas(idAdm: number, cant: number){
    return this.http.get(this.URL_API + '/getNotificaciones/' + idAdm +"/"+cant);
  }

  archivarNotificacion(notificacion: Notificacion){
    return this.http.post(this.URL_API + '/archivar', notificacion.idNotificacion);
  }

  notificacionSetVista(notificacion: Notificacion){
    return this.http.post(this.URL_API + '/setVista', notificacion.idNotificacion);
  }

  getCantNotificacionesNoVistas(email: String){
    return this.http.get(this.URL_API + '/getCantNoVistas/' + email);
  }
}
