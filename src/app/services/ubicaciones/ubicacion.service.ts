import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UbicacionDto } from 'src/app/models/ubicacion-dto';

@Injectable({
  providedIn: 'root'
})
export class UbicacionService {

  readonly URL_API = 'http://localhost:9090/Ubicacion';

  constructor(private http: HttpClient) { }

  getUbicacionesRestriccion(idRestriccion: number) {
    return this.http.get(this.URL_API + "/getByRestriccion/" + idRestriccion);
  }

  getEstaInfringiendo(idRestriccion: number, ubicacionDTO: UbicacionDto) {
    return this.http.post(this.URL_API + "/infringe/" + idRestriccion, ubicacionDTO);
  }

  getUbicacionPromedioRutina(idPersona: number, dia: number, hora: number, minutos: number) {
    return this.http.get('http://localhost:9090/UbicacionRutina/persona=' + idPersona +
      "/dia=" + dia + "/hora=" + hora + "/minutos=" + minutos);
  }

}
