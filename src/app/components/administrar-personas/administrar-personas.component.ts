import { Component, OnInit } from '@angular/core';
import { PersonaService } from 'src/app/services/personas/persona.service';
import { Persona } from 'src/app/models/persona';
import { NgForm } from '@angular/forms';
import { FormPersonaDTO } from 'src/app/models/form-persona-dto';
import { ErrorDTO } from 'src/app/models/error-dto';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-administrar-personas',
  templateUrl: './administrar-personas.component.html',
  styleUrls: ['./administrar-personas.component.css']
})
export class AdministrarPersonasComponent implements OnInit {

  personaDTOSelleccionada = new FormPersonaDTO;
  rolSeleccionado;
  roles;

  mostrarImagen: boolean = false;
  imagenSeleccionada: File = null;

  hayError = false;

  constructor(private personaService: PersonaService, private toastr: ToastrService) {
    this.roles = ['DAMNIFICADA', 'VICTIMARIO'];
  }

  ngOnInit() {
    this.getPersonas();
  }

  getPersonas() {
    this.personaService.getPersonas()
      .subscribe(res => {
        this.personaService.personas = res as Persona[];
        console.log(res);
      })
  }

  agregarPersona(personaForm: NgForm) {
    this.personaDTOSelleccionada.usuario.rolDeUsuario = this.rolSeleccionado;

    let ngbDate = personaForm.value.fechaNacimiento;
    let myDate = new Date(ngbDate.year, ngbDate.month - 1, ngbDate.day);
    this.personaDTOSelleccionada.persona.fechaNacimiento = myDate;
    this.personaService.postPersona(this.personaDTOSelleccionada)
      .subscribe(res => {
        var error = res as ErrorDTO;
        if (error.hayError) {
          //MOSTRAR ERROR
          this.toastr.error("" + error.mensajeError, "Error!");
          this.setHayError();
        }
        else {
          this.toastr.success("Persona agregada correctamente", "Agregada!");
          this.getPersonas();
          personaForm.reset();
        }
      })
  }

  setHayError(): void {
    this.hayError = true;
    setTimeout(() => {
      this.hayError = false;
    }, 5000);
  }

  archivoSeleccionado(event){
    this.imagenSeleccionada = event.target.files[0];
    if(this.imagenSeleccionada!=null)
      document.getElementById("labelImagen").innerHTML = ""+this.imagenSeleccionada.name;
    else
      document.getElementById("labelImagen").innerHTML = "Choose File";
    console.log(this.imagenSeleccionada);
  }

  cambioRol(){
    if(this.rolSeleccionado=="VICTIMARIO")
      this.mostrarImagen= true;
    else
      this.mostrarImagen= false;
  }

}
