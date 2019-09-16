import { Component, OnInit } from '@angular/core';
import { RestriccionService } from '../../services/restricciones/restriccion.service';
import { RestriccionDTO } from 'src/app/models/restriccion-dto';

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
     this.restriccionService.restricciones = res as RestriccionDTO[];
     console.log(res);
   })
  }

}
