import { Persona } from './persona';
import { Usuario } from './usuario';
import { Direccion } from './direccion';

export class FormPersonaDTO {

    constructor(persona= new Persona, usuario= new Usuario, direccion = new Direccion){
        this.persona=persona;
        this.usuario=usuario;
        this.direccion=direccion;
    }

    persona: Persona;
    usuario: Usuario;
    direccion: Direccion;
}
