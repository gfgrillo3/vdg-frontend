import { Component, OnInit } from '@angular/core';
import { PruebaDeVida } from 'src/app/models/prueba-de-vida';
import { NgForm } from '@angular/forms';
import { PruebaDeVidaService } from 'src/app/services/pruebaDeVida/prueba-de-vida.service';
import { ComunicacionService } from 'src/app/services/comunicacion/comunicacion.service';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { RestriccionDTO } from 'src/app/models/restriccion-dto';

@Component({
  selector: 'app-pruebas-de-vida',
  templateUrl: './pruebas-de-vida.component.html',
  styleUrls: ['./pruebas-de-vida.component.css']
})
export class PruebasDeVidaComponent implements OnInit {

  pruebasDeVida: PruebaDeVida[];

  pruebaDeVida = new PruebaDeVida;
  spinnerBoolean: boolean = false;
  restriccion: RestriccionDTO;

  constructor(private pruevaDeVidaService: PruebaDeVidaService,
    private comunicacion: ComunicacionService,
    config: NgbModalConfig, private modalService: NgbModal) {

    config.backdrop = 'static';
    config.keyboard = false;
  }

  ngOnInit() {
    if(this.comunicacion.restriccionDTO != null){
      this.restriccion = this.comunicacion.restriccionDTO;
      this.imprimirNombrePersona();
      this.getPruebasDeVidaPersona(this.comunicacion.restriccionDTO.victimario.idPersona);
    }
  }

  enviarPruebaDeVida(pruebaDeVidaForm: NgForm) {
    this.pruebaDeVida.idRestriccion = this.comunicacion.restriccionDTO.restriccion.idRestriccion;
    this.pruebaDeVida.idPersonaRestriccion = this.comunicacion.restriccionDTO.victimario.idPersona;
    this.pruebaDeVida.estado = "Pendiente";
    this.pruevaDeVidaService.postPruebaDeVida(this.pruebaDeVida)
      .subscribe(res => {
        console.log(res);
        pruebaDeVidaForm.reset();
        this.pruebaDeVida = new PruebaDeVida;
        this.getPruebasDeVidaPersona(this.comunicacion.restriccionDTO.victimario.idPersona);
      })
  }

  getPruebasDeVidaPersona(idPersona: number) {
    this.spinnerBoolean = true;
    this.pruevaDeVidaService.getPruevasDeVidaPersona(idPersona)
      .subscribe(res => {
        this.spinnerBoolean = false;
        this.pruebasDeVida = res as PruebaDeVida[];
        console.log(res);
      })
  }

  aceptarPruebaDeVida(){
    this.pruebaDeVida.estado = "Aceptada";
    this.pruevaDeVidaService.putPruebaDeVida(this.pruebaDeVida)
    .subscribe(res => {
      console.log(res);
      this.pruebaDeVida = new PruebaDeVida;
      this.getPruebasDeVidaPersona(this.comunicacion.restriccionDTO.victimario.idPersona);
      this.modalService.dismissAll();
    })
  }

  rechazarPruebaDeVida(){
    this.pruebaDeVida.estado = "Rechazada";
    this.pruevaDeVidaService.putPruebaDeVida(this.pruebaDeVida)
    .subscribe(res => {
      console.log(res);
      this.pruebaDeVida = new PruebaDeVida;
      this.getPruebasDeVidaPersona(this.comunicacion.restriccionDTO.victimario.idPersona);
      this.modalService.dismissAll();
    })
  }

  open(content, prueba: PruebaDeVida) {
    this.pruebaDeVida = prueba;
    this.modalService.open(content, {size: 'xl'});
  }

  imprimirNombrePersona(){
    if (this.restriccion != null) {
      document.getElementById("restriccionSeleccionada").innerHTML = ""
        + this.restriccion.victimario.apellido + ", " + this.restriccion.victimario.nombre;
    }
  }
}
