import { Component, OnInit } from '@angular/core';
import { PersonaService } from 'src/app/services/personas/persona.service';
import { Persona } from 'src/app/models/persona';
import { NgForm } from '@angular/forms';
import { FormPersonaDTO } from 'src/app/models/form-persona-dto';
import { ErrorDTO } from 'src/app/models/error-dto';
import { ToastrService } from 'ngx-toastr';
import { ProvinciaLocalidadService } from 'src/app/services/provincia-localidad/provincia-localidad.service';
import { Provincia } from 'src/app/models/provincia';
import { Localidad } from 'src/app/models/localidad';
import { FotoIdentificacion } from 'src/app/models/foto-identificacion';
import { FotoIdentificacionService } from 'src/app/services/fotoIdentificacion/foto-identificacion.service';

@Component({
  selector: 'app-administrar-personas',
  templateUrl: './administrar-personas.component.html',
  styleUrls: ['./administrar-personas.component.css']
})
export class AdministrarPersonasComponent implements OnInit {

  personaDTOSelleccionada = new FormPersonaDTO;
  fotoIdentificacion = new FotoIdentificacion;
  fecha: Date = new Date();
  maxDatePicker = { year: this.fecha.getFullYear(), month: this.fecha.getMonth() + 1, day: this.fecha.getDate() };

  //COMBO ROLES
  rolSeleccionado;
  roles;

  //COMBOS LOCALIDAD PROVINCIA
  provincias;
  provinciaSeleccionada;
  localidades;
  localidadSeleccionada;

  //CONDOCIONALES PARA FORM
  mostrarImagen: boolean = false;
  imagenSeleccionada: File = null;

  hayError = false;
  spinnerBoolean: boolean = false;

  constructor(private personaService: PersonaService,
    private toastr: ToastrService,
    private provinciaLocalidadService: ProvinciaLocalidadService,
    private fotoIdentificacionService: FotoIdentificacionService) {
    this.roles = ['DAMNIFICADA', 'VICTIMARIO'];
  }

  ngOnInit() {
    this.getPersonas();
    this.getProvincias();
  }

  getPersonas() {
    this.spinnerBoolean = true;
    this.personaService.getPersonas()
      .subscribe(res => {
        this.spinnerBoolean = false;
        this.personaService.personas = res as Persona[];
        console.log(res);
      })
  }

  agregarPersona(personaForm: NgForm) {
    //CARGO DATOS DEL FORM A PERSONA
    this.personaDTOSelleccionada.usuario.rolDeUsuario = this.rolSeleccionado;
    let ngbDate = personaForm.value.fechaNacimiento;
    let myDate = new Date(ngbDate.year, ngbDate.month - 1, ngbDate.day);
    this.personaDTOSelleccionada.persona.fechaNacimiento = myDate;

    //Logica para leer el archivo y guardarlo
    //Guardo la instancia del componente para usar dentro de la promesa, y el BLOB
    var imgSeleccionadaBlob;
    let thisjr = this;
    imgSeleccionadaBlob = new Blob([this.imagenSeleccionada]);

    //Creo la promesa para guardar la foto después de cargarla completamente
    var promise = new Promise(getBuffer);

    // Espero a terminar la funcion de la promesa, y entonces guardo.
    promise.then(function (imgBase64) {
      let img: string = imgBase64 as string;
      thisjr.personaDTOSelleccionada.foto = img;

      thisjr.personaService.postPersona(thisjr.personaDTOSelleccionada)
        .subscribe(res => {
          var error = res as ErrorDTO;
          if (error.hayError) {
            //MOSTRAR ERROR
            thisjr.toastr.error("" + error.mensajeError, "Error!");
            thisjr.setHayError();
          }
          else {
            thisjr.toastr.success("Persona agregada correctamente", "Agregada!");
            console.log(thisjr.personaDTOSelleccionada);
            thisjr.getPersonas();
            personaForm.reset();
          }
        })



    })

    //Funcion para usar en la promesa para esperar a que se cargue la foto
    function getBuffer(resolve) {
      var fileReader = new FileReader();
      fileReader.readAsDataURL(imgSeleccionadaBlob);
      fileReader.onload = function () {
        var imgBase64 = fileReader.result
        resolve(imgBase64);
      }
    }
  }

  setHayError(): void {
    this.hayError = true;
    setTimeout(() => {
      this.hayError = false;
    }, 5000);
  }

  archivoSeleccionado(event) {
    //Obtengo la imagen seleccionada
    this.imagenSeleccionada = event.target.files[0];
    if (this.imagenSeleccionada != null) 
      document.getElementById("labelImagen").innerHTML = "" + this.imagenSeleccionada.name;
    else
      document.getElementById("labelImagen").innerHTML = "Choose File";
  }

  eliminarPersona(idPersona: number) {
    this.personaService.deletePersona(idPersona)
      .subscribe(res => {
        var error = res as ErrorDTO;
        if (error.hayError) {
          //MOSTRAR ERROR
          this.toastr.error("" + error.mensajeError, "Error!");
        }
        else {
          this.toastr.success('Persona eliminada correctamente', 'Eliminada!');
          this.getPersonas();
        }
      });
  }

  //SELECCION DE ROL PARA MOSTRAR U OCULTAR IMAGEN
  cambioRol() {
    if (this.rolSeleccionado == "VICTIMARIO")
      this.mostrarImagen = true;
    else
      this.mostrarImagen = false;
  }

  //Obtener las provincias
  getProvincias() {
    this.provinciaLocalidadService.getProvincias()
      .subscribe(res => {
        this.provincias = res as Provincia[];
      });
  }

  //SELECCION DE PROVINCIA PARA LLENAR LAS LOCALIDADES
  cambioProvincia() {
    for (var i = 0; i < this.provincias.length; i++) {
      if (this.provincias[i].nombre == this.provinciaSeleccionada)
        this.getLocalidades(this.provincias[i].idProvincia);
    }
  }

  //SE LLENA LAS LOCALIDADES SEGUN PROVINCIA
  getLocalidades(idProvincia: number) {
    this.provinciaLocalidadService.getLocalidades(idProvincia)
      .subscribe(res => {
        this.localidades = res as Localidad[];
      });
  }

  //SELECCION DE LOCALIDAD
  cambioLocalidad() {
    for (var i = 0; i < this.localidades.length; i++) {
      if (this.localidades[i].nombre == this.localidadSeleccionada) {
        this.personaDTOSelleccionada.direccion.idLocalidad = this.localidades[i].idLocalidad;
        return;
      }
    }
  }

}
