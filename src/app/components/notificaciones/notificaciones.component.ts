import { Component, OnInit } from '@angular/core';
import { Notificacion } from 'src/app/models/notificacion';
import { NotificacionService } from 'src/app/services/notificaciones/notificacion.service';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-notificaciones',
  templateUrl: './notificaciones.component.html',
  styleUrls: ['./notificaciones.component.css']
})
export class NotificacionesComponent implements OnInit {

  notificaciones: Notificacion[];

  check = false;
  notificacionSeleccionada: Notificacion;

  constructor(private notificacionService: NotificacionService,
    config: NgbModalConfig, private modalService: NgbModal) {
  }

  ngOnInit() {
    this.getNotificacionesNoArchivadas();
  }

  getNotificacionesArchivadas() {
    this.notificacionService.getNotificacionesArchivadas(localStorage.getItem("emailUsuario"))
      .subscribe(res => {
        this.notificaciones = res as Notificacion[];
        console.log(res);
      })
  }

  getNotificacionesNoArchivadas() {
    this.notificacionService.getNotificacionesNoArchivadas(localStorage.getItem("emailUsuario"))
      .subscribe(res => {
        this.notificaciones = res as Notificacion[];
        console.log(res);
      })
  }

  verArchivadas() {
    if (this.check == true) {
      this.getNotificacionesArchivadas();
    }
    else {
      this.getNotificacionesNoArchivadas();
    }
  }

  open(content, notificacion) {
    this.notificacionSeleccionada = notificacion;
    this.setVista();
    this.modalService.open(content);
  }

  archivar() {
    this.notificacionService.archivarNotificacion(this.notificacionSeleccionada).subscribe(res => {
      this.getNotificacionesNoArchivadas();
      this.modalService.dismissAll();
    })
  }

  setVista() {
    if(this.notificacionSeleccionada.estado == 'NoVista'){
      this.notificacionService.notificacionSetVista(this.notificacionSeleccionada).subscribe(res => {
        this.getNotificacionesNoArchivadas();
      })
    }
  }
}
