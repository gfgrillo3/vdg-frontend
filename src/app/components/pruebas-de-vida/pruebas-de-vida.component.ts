import { Component, OnInit } from '@angular/core';
import { PruebaDeVida } from 'src/app/models/prueba-de-vida';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-pruebas-de-vida',
  templateUrl: './pruebas-de-vida.component.html',
  styleUrls: ['./pruebas-de-vida.component.css']
})
export class PruebasDeVidaComponent implements OnInit {

  pruebaDeVida = new PruebaDeVida;

  constructor() { }

  ngOnInit() {
  }

  enviarPruebaDeVida(pruebaDeVidaForm: NgForm){
    pruebaDeVidaForm.reset();
    this.pruebaDeVida = new PruebaDeVida;
  }

}
