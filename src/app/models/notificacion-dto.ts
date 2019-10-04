import { Notificacion } from './notificacion';
import { Incidencia } from './incidencia';

export class NotificacionDTO {

    constructor(notificacion = new Notificacion, incidencia = new Incidencia){
        this.notificacion = notificacion;
        this.incidencia = incidencia;
    }

    notificacion: Notificacion;
    incidencia: Incidencia;
}
