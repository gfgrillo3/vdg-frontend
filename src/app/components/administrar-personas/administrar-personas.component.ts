import { Component, OnInit } from '@angular/core';
import { PersonaService } from 'src/app/services/personas/persona.service';
import { Persona } from 'src/app/models/persona';
import { NgForm } from '@angular/forms';
import { FormPersonaDTO } from 'src/app/models/form-persona-dto';

@Component({
  selector: 'app-administrar-personas',
  templateUrl: './administrar-personas.component.html',
  styleUrls: ['./administrar-personas.component.css']
})
export class AdministrarPersonasComponent implements OnInit {

  personaDTOSelleccionada = new FormPersonaDTO;
  rolSeleccionado;
  roles;
  
  constructor(private personaService: PersonaService) { 
    this.roles = ['DAMNIFICADA','VICTIMARIO'];
  }

  ngOnInit() {
    this.getPersonas();
  }

  getPersonas(){
    this.personaService.getPersonas()
      .subscribe(res => {
        this.personaService.personas = res as Persona[];
        console.log(res);
      })
  }

  agregarPersona(personaForm: NgForm){
    this.personaDTOSelleccionada.usuario.rolDeUsuario=this.rolSeleccionado;
    console.log(this.personaDTOSelleccionada);
  }

}
