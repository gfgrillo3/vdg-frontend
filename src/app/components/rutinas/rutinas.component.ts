import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-rutinas',
  templateUrl: './rutinas.component.html',
  styleUrls: ['./rutinas.component.css']
})
export class RutinasComponent implements OnInit {

  dias=['Lunes','Martes','Miércoles','Jueves','Viernes','Sábado','Domingo',]

  constructor() { }

  ngOnInit() {
  }

}
