import { Component } from '@angular/core';
import { ReservaAsientos } from './reserva-asientos/reserva-asientos';
import { MapaComponent } from './mapa/mapa';
@Component({
  selector: 'app-root',
  imports: [ReservaAsientos, MapaComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  title = 'sistema-reservas';
}
