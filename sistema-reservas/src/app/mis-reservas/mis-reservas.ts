import { Component, OnInit } from '@angular/core';
import { ReservaService } from '../service/reserva';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-mis-reservas',
  imports: [CommonModule],
  templateUrl: './mis-reservas.html'
})
export class MisReservas implements OnInit {

  reservas: any[] = [];

  constructor(private reservaService: ReservaService) {}

  ngOnInit(): void {
    this.obtenerReservas();
  }

  obtenerReservas() {
    this.reservas = this.reservaService.getReservas();
  }

  anularReserva(id: number) {
    this.reservaService.anularReserva(id);
    alert('Reserva anulada');
    this.obtenerReservas();
  }

  postergarReserva() {
    alert('Reserva postergada');
  }
}
