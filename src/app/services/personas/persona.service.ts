import { Injectable } from '@angular/core';
import { FormPersonaDTO } from 'src/app/models/form-persona-dto';
import { HttpClient } from '@angular/common/http';
import { Persona } from 'src/app/models/persona';

@Injectable({
  providedIn: 'root'
})
export class PersonaService {

  personaDTOSelleccionada: FormPersonaDTO;
  personas: Persona[];
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

}
