import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { NotificacionService } from 'src/app/services/notificaciones/notificacion.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  intervalo;
  cantNotificaciones = 0;
  notificacionesNoLeidas = "";

  constructor(private toastr: ToastrService, private notificacionService: NotificacionService) { }

  ngOnInit() {
    /*
    clearInterval(this.intervalo);
    let thisjr = this;
    this.intervalo = setInterval(function () {
      thisjr.controlarNotificaciones(thisjr);
    }, 6000);
    */
  }

  controlarNotificaciones(thisjr) {
    //BUSCO LA CANTIDAD DE NOTIFICACIONES NO VISTAS
    thisjr.notificacionService.getCantNotificacionesNoVistas(localStorage.getItem("emailUsuario")).subscribe(
      res => {
        var cantNoVistas = res;
        
        //SI TENGO MAS NO VISTAS, MUESTRO TOASTR
        if(cantNoVistas > thisjr.cantNotificaciones){
          thisjr.toastr.info("NUEVAS NOTIFICACIONES");
        }

        //SI LA CANTIDAD QUE OBTUVE DE NO VISTAS ES DISTINTA A LA ACTUAL, LO ACTUALIZO
        if(cantNoVistas != thisjr.cantNotificaciones){
          thisjr.cantNotificaciones = cantNoVistas;
          thisjr.notificacionesNoLeidas = cantNoVistas;
        }

        //SI LA CANTIDAD ES >100, MUESTRO MSJ +99
        if(cantNoVistas>100){
          thisjr.notificacionesNoLeidas = "+99";
        }
        
      }
    );
  }

  salir() {
    localStorage.setItem("emailUsuario", "");
  }
}
