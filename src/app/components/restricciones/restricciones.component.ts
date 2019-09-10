import { Component, OnInit } from '@angular/core';
import { RestriccionService } from '../../services/restricciones/restriccion.service';
import { Restriccion } from '../../models/restriccion';

@Component({
  selector: 'app-restricciones',
  templateUrl: './restricciones.component.html',
  styleUrls: ['./restricciones.component.css'],
  providers: [RestriccionService]
})
export class RestriccionesComponent implements OnInit {

  constructor(private restriccionService : RestriccionService) { }

  ngOnInit() {
    this.getRestricciones();
  }

  getRestricciones(){
   this.restriccionService.getRestricciones()
   .subscribe(res =>  {
     this.restriccionService.restricciones = res as Restriccion[];
     console.log(res);
   })
  }


}
