import { Component, OnInit } from '@angular/core';
import { Persona } from 'src/app/models/persona';
import { Usuario } from 'src/app/models/usuario';
import { Restriccion } from 'src/app/models/restriccion';
import { NgForm } from '@angular/forms';
import { RestriccionService } from 'src/app/services/restricciones/restriccion.service';
import { PersonaService } from 'src/app/services/personas/persona.service';
import { UsuarioService } from 'src/app/services/login/usuario.service';
import { RestriccionDTO } from 'src/app/models/restriccion-dto';
import { ErrorDTO } from 'src/app/models/error-dto';
import { Subject } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-administrar-restricciones',
  templateUrl: './administrar-restricciones.component.html',
  styleUrls: ['./administrar-restricciones.component.css']
})
export class AdministrarRestriccionesComponent implements OnInit {

  damnificada = new Persona;
  victimario = new Persona;
  administrativo = new Usuario;
  restriccion = new Restriccion;

  camposIncompletos = false;
  fecha: Date = new Date();
  maxDatePicker = { year: this.fecha.getFullYear(), month: this.fecha.getMonth() + 1, day: this.fecha.getDate() };
  
  spinnerBoolean: boolean = false;

  constructor(private restriccionService: RestriccionService,
    private personaService: PersonaService,
    private usuarioService: UsuarioService, private toastr: ToastrService) { }

  ngOnInit() {
    this.getRestricciones();
  }  

  getRestricciones() {
    this.spinnerBoolean = true;
    this.restriccionService.getRestricciones()
      .subscribe(res => {
        this.spinnerBoolean = false;
        this.restriccionService.restricciones = res as RestriccionDTO[];
        console.log(res);
      })
  }

  agregarVictimario() {
    //ACA TRAIGO AL VICTIMARIO
    this.personaService.getVictimarioByDNI(this.victimario.dni)
      .subscribe(res => {
        if(res==null){
          this.toastr.error("Verificar el DNI de victimario ingresado.", "Error!");
          this.setCamposIncompletos();
          return;
        }
        this.victimario = res;
        document.getElementById("labelVictimario").innerHTML =
         "Victimario: " + this.victimario.apellido + ", " + this.victimario.nombre;
      })

  }

  agregarDamnificada() {
    //ACA TRAIGO LA DAMNIFICADA
    this.personaService.getDamnificadaByDNI(this.damnificada.dni)
      .subscribe(res => {
        if(res==null){
          this.toastr.error("Verificar el DNI de damnificada ingresado.", "Error!");          
          this.setCamposIncompletos();
          return;
        }
        this.damnificada = res;
        document.getElementById("labelDamnificada").innerHTML =
          "Damnificada: " + this.damnificada.apellido + ", " + this.damnificada.nombre;
      })
  }

  agregarAdministrativo() {
    this.usuarioService.getUsuarioByEmail(this.administrativo.email)
      .subscribe(res => {
        if(res==null){
          this.toastr.error("Verificar el email de usuario ingresado.", "Error!");
          this.setCamposIncompletos();
          return;
        }
        this.administrativo = res;
        document.getElementById("labelAdministrativo").innerHTML =
          "Administrativo: " + this.administrativo.email;
      })
  }

  agregarRestriccion(restriccionForm: NgForm) {
    this.restriccion.idDamnificada = this.damnificada.idPersona;
    this.restriccion.idVictimario = this.victimario.idPersona;
    this.restriccion.idUsuario = this.administrativo.idUsuario;

    let ngbDate = restriccionForm.value.dp;
    let myDate = new Date(ngbDate.year, ngbDate.month - 1, ngbDate.day);
    this.restriccion.fechaSentencia = myDate;

    if(this.restriccion.idDamnificada == 0 || this.restriccion.idVictimario == 0 
      || this.restriccion.idDamnificada ==0){
        this.toastr.error("Completar todos los campos", "Error!");
        this.setCamposIncompletos();
      }
    else{
    this.restriccionService.postRestriccion(this.restriccion)
      .subscribe(res => {
        var error = res as ErrorDTO;
        if (error.hayError) {
          //MOSTRAR ERROR
          this.toastr.error(""+error.mensajeError, "Error!");
          this.setCamposIncompletos();
        }
        else {
          this.toastr.success("La restricción se agrego correctamente", "Agregada!");
          restriccionForm.reset();
          this.getRestricciones();
          document.getElementById("labelVictimario").innerHTML = "";
          document.getElementById("labelDamnificada").innerHTML = "";
          document.getElementById("labelAdministrativo").innerHTML = "";
          this.victimario = new Persona;
          this.damnificada = new Persona;
          this.administrativo = new Usuario;
        }
      })

    
    }
  }

  confirm() {
    if (window.confirm("Are you sure to delete ")) {
      console.log("eliminar restriccion");
    }
  }

  setCamposIncompletos(): void{
    this.camposIncompletos = true;
    setTimeout(() => {
      this.camposIncompletos = false;
    }, 5000);  
  }

}
