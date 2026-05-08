import { Component, OnInit } from '@angular/core';
import { ReservaService } from '../service/reserva';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-reservar-sala',
  imports: [CommonModule, FormsModule],
  templateUrl: './reservar-sala.html'
})
export class ReservarSala implements OnInit {

  sala: any = {};

  reserva = {
    personas: 1,
    fecha: '',
    horaInicio: '',
    horaFin: '',
    accesibilidad: false,
    observaciones: ''
  };

  constructor(private reservaService: ReservaService) {}

  ngOnInit(): void {
    this.sala = this.reservaService.getSala();
  }

  guardarReserva() {

    const nuevaReserva = {
      id: Date.now(),
      sala: this.sala.codigo,
      fecha: this.reserva.fecha,
      horaInicio: this.reserva.horaInicio,
      horaFin: this.reserva.horaFin,
      estado: 'Activa'
    };

    this.reservaService.registrarReserva(nuevaReserva);

    alert('Reserva registrada correctamente');

    this.reserva = {
      personas: 1,
      fecha: '',
      horaInicio: '',
      horaFin: '',
      accesibilidad: false,
      observaciones: ''
    };
  }
}
