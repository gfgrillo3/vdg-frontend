import { Component, OnInit } from '@angular/core';
import { PruebaDeVida } from 'src/app/models/prueba-de-vida';
import { NgForm } from '@angular/forms';
import { PruebaDeVidaService } from 'src/app/services/pruebaDeVida/prueba-de-vida.service';
import { ComunicacionService } from 'src/app/services/comunicacion/comunicacion.service';

@Component({
  selector: 'app-pruebas-de-vida',
  templateUrl: './pruebas-de-vida.component.html',
  styleUrls: ['./pruebas-de-vida.component.css']
})
export class PruebasDeVidaComponent implements OnInit {

  pruebasDeVida: PruebaDeVida[];

  pruebaDeVida = new PruebaDeVida;

  constructor(private pruevaDeVidaService: PruebaDeVidaService,
              private comunicacion: ComunicacionService) { }

  ngOnInit() {
    this.getPruebasDeVidaPersona(this.comunicacion.restriccionDTO.victimario.idPersona);
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
    this.pruevaDeVidaService.getPruevasDeVidaPersona(idPersona)
      .subscribe(res => {
        this.pruebasDeVida = res as PruebaDeVida[];
        console.log(res);
      })
  }

}
