import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ReservaService {

  salas = [
    {
      id: 1,
      sede: 'UPN SJL',
      piso: '5',
      codigo: 'A508',
      capacidad: 12,
      tipo: 'Sala de estudio'
    },
    {
      id: 2,
      sede: 'UPN SJL',
      piso: '4',
      codigo: 'B402',
      capacidad: 8,
      tipo: 'Sala accesible'
    }
  ];

  reservas = [
    {
      id: 1,
      sala: 'A508',
      fecha: '2026-05-10',
      horaInicio: '10:00',
      horaFin: '12:00',
      estado: 'Activa'
    },
    {
      id: 2,
      sala: 'B402',
      fecha: '2026-05-05',
      horaInicio: '14:00',
      horaFin: '16:00',
      estado: 'Finalizada'
    }
  ];

  getSala() {
    return this.salas[0];
  }

  getReservas() {
    return this.reservas;
  }

  registrarReserva(reserva: any) {
    this.reservas.push(reserva);
  }

  anularReserva(id: number) {
    const reserva = this.reservas.find(r => r.id === id);

    if (reserva) {
      reserva.estado = 'Anulada';
    }
  }
}
