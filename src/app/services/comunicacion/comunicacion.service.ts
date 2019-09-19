import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { RestriccionDTO } from 'src/app/models/restriccion-dto';

@Injectable({
  providedIn: 'root'
})
export class ComunicacionService {

  restriccionDTO: RestriccionDTO;

  enviarRestriccion(restriccion: RestriccionDTO){
    this.restriccionDTO = restriccion;
  }

}
