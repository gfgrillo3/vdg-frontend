import { Component, OnInit } from '@angular/core';
import { Notificacion } from 'src/app/models/notificacion';
import { NotificacionService } from 'src/app/services/notificaciones/notificacion.service';

@Component({
  selector: 'app-notificaciones',
  templateUrl: './notificaciones.component.html',
  styleUrls: ['./notificaciones.component.css']
})
export class NotificacionesComponent implements OnInit {
  
  notificaciones: Notificacion[];

  constructor(private notificacionService: NotificacionService) { }

  ngOnInit() {
    this.getNotificaciones();
  }

  getNotificaciones() {
    this.notificacionService.getNotificaciones(localStorage.getItem("emailUsuario"))
      .subscribe(res => {
        this.notificaciones = res as Notificacion[];
        console.log(res);
      })
  }

}
