import { Injectable } from '@angular/core';
import { FormPersonaDTO } from 'src/app/models/form-persona-dto';
import { HttpClient } from '@angular/common/http';
import { Persona } from 'src/app/models/persona';

@Injectable({
  providedIn: 'root'
})
export class PersonaService {

  personaDTOSelleccionada: FormPersonaDTO;
  personas: FormPersonaDTO[];
  readonly URL_API = 'http://localhost:9090/FormABMPersona';


  constructor(private http: HttpClient) {
    this.personaDTOSelleccionada = new FormPersonaDTO;
  }

  getPersonas(){
    return this.http.get(this.URL_API);
  }

  postPersona(personaDTO: FormPersonaDTO){
    console.log(personaDTO);
    return this.http.post(this.URL_API, personaDTO);
  }

  getVictimarioByDNI(dni: string){
    return this.http.get<Persona>("http://localhost:9090/Persona/GetVictimarioByDni/"+dni);
  }

  getDamnificadaByDNI(dni: string){
    return this.http.get<Persona>("http://localhost:9090/Persona/GetDamnificadaByDni/"+dni);
  }

  deletePersona(id: number){
    return this.http.delete(this.URL_API + "/" + id);
  }

  putPersona(personaDTO: FormPersonaDTO){
    return this.http.put(this.URL_API + "/ModificarPersona", personaDTO);
  }

}
