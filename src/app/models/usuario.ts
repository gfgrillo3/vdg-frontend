export class Usuario {

    constructor(idUsuario = 0, email = '', contrasena = '',rolDeUsuario = ''){
        this.idUsuario=idUsuario;
        this.email=email;
        this.contrasena=contrasena;
        this.rolDeUsuario=rolDeUsuario;
    }

    idUsuario: number;
    email: string;
    contrasena: string;
    rolDeUsuario: string;
}
