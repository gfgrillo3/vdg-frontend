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
    this.roles = ['VICTIMA','VICTIMARIO'];
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

    let ngbDate = personaForm.value.fechaNacimiento;
    let myDate = new Date(ngbDate.year, ngbDate.month-1, ngbDate.day);
    this.personaDTOSelleccionada.persona.fechaNacimiento = myDate;
    this.personaService.postPersona(this.personaDTOSelleccionada)
      .subscribe(res => {
        console.log("persona agregada correctamente");
        this.getPersonas();
        personaForm.reset();
      })
  }

}
