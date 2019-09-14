export class Restriccion {

    constructor(idRestriccion=0,idAdministrativo=0,idDamnificada=0,
        idVictimario=0,distancia=0,fechaSentencia=null){
            this.idRestriccion=idRestriccion;
            this.idAdministrativo=idAdministrativo;
            this.idDamnificada=idDamnificada;
            this.idVictimario=idVictimario;
            this.distancia=distancia;
            this.fechaSentencia=fechaSentencia;
    }

    idRestriccion: number;
    idAdministrativo: number;
    idDamnificada: number;
    idVictimario: number;
    distancia: number;
    fechaSentencia: Date;

}
