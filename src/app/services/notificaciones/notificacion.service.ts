import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class NotificacionService {

  readonly URL_API = 'http://localhost:9090/Notificacion';

  constructor(private http: HttpClient) { }

  getNotificacionesArchivadas(email: string){
    return this.http.get(this.URL_API + '/getArchivadas/' + email);
  }

  getNotificacionesNoArchivadas(email: string){
    return this.http.get(this.URL_API + '/getNotificaciones/' + email);
  }
}
