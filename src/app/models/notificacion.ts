export class Notificacion {

    constructor(idNotificacion = 0, idIncidencia = 0, idUsuario = 0, visto = false){
        this.idNotificacion = idNotificacion;
        this.idIncidencia = idIncidencia;
        this.idUsuario = idUsuario;
        this.visto = visto;
    }

    idNotificacion: number;
    idIncidencia: number;
    idUsuario: number;
    visto: boolean;
}
