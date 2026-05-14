import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'; // Se agregó HttpHeaders
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReservaService {

  private apiUrlUsuarios = 'http://localhost:8080/api/usuarios';
  private apiUrlReservasNuevas = 'http://localhost:8080/api/reservas';

  // 1. CONFIGURACIÓN DE SEGURIDAD (Credenciales admin:upn2026)
  private authHeader = 'Basic ' + btoa('admin:upn2026');

  // 2. FUNCIÓN PARA GENERAR LAS CABECERAS DE AUTORIZACIÓN
  private getOptions() {
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': this.authHeader
      })
    };
  }

  constructor(private http: HttpClient) { }

  // -------------------------------------------------------------------------
  // MÉTODOS PARA EL BACKEND (MYSQL) - Con Seguridad Activada
  // -------------------------------------------------------------------------

  registrarUsuario(usuario: any): Observable<any> {
    // Se agrega this.getOptions() como tercer parámetro
    return this.http.post(`${this.apiUrlUsuarios}/registrar`, usuario, this.getOptions());
  }

  guardarReservaBD(reserva: any): Observable<any> {
    // Se agrega this.getOptions() como tercer parámetro
    return this.http.post(`${this.apiUrlReservasNuevas}/registrar`, reserva, this.getOptions());
  }

  // -------------------------------------------------------------------------
  // DATA LOCAL (Mantenida intacta)
  // -------------------------------------------------------------------------

  salas: any[] = [
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

  reservas: any[] = [
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

  // -------------------------------------------------------------------------
  // MÉTODOS LOCALES (Mantenidos intactos)
  // -------------------------------------------------------------------------

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