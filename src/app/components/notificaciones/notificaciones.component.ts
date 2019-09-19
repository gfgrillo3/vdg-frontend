import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { ComunicacionService } from 'src/app/services/comunicacion/comunicacion.service';

@Component({
  selector: 'app-notificaciones',
  templateUrl: './notificaciones.component.html',
  styleUrls: ['./notificaciones.component.css']
})
export class NotificacionesComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
