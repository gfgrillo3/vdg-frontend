export class Localidad {

    constructor(idLocalidad=0,nombre='',codigoPostal=''){
        this.idLocalidad=idLocalidad;
        this.nombre=nombre;
        this.codigoPostal=codigoPostal;
    }

    idLocalidad: number;
    nombre: string;
    codigoPostal: string;
}
