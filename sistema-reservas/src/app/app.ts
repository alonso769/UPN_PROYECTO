import { Component } from '@angular/core';
import { ReservaAsientos } from './reserva-asientos/reserva-asientos';

@Component({
  selector: 'app-root',
  imports: [ReservaAsientos],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App { 
  title = 'sistema-reservas';
}