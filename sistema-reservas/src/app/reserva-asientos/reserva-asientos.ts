import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ReservaService } from '../service/reserva';

export interface Asiento {
  id: string;
  estado: 'disponible' | 'ocupado' | 'seleccionado';
  tipo: 'estandar' | 'preferencial';
}

export interface ClaseAsignada {
  id: string;
  dia: string;
  curso: string;
  profesor: string;
  aula: string;
  capacidad: number;
  tieneAscensor: boolean;
  horario: string;
  asientos: Asiento[];
}

@Component({
  selector: 'app-reserva-asientos',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './reserva-asientos.html',
  styleUrls: ['./reserva-asientos.css']
})
export class ReservaAsientos implements OnInit {
  diasSemana = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
  diaSeleccionado = 'Jueves'; 
  
  baseDatosClases: ClaseAsignada[] = [];
  clasesDelDia: ClaseAsignada[] = [];
  claseActual!: ClaseAsignada;
  
  asientosSeleccionados: Asiento[] = [];

  constructor(private router: Router, private reservaService: ReservaService) {}

  ngOnInit(): void {
    this.generarBaseDeDatosSimulada();
    this.alCambiarDia();
  }

  // Base de datos simulada con cursos para toda la semana
  generarBaseDeDatosSimulada() {
    this.baseDatosClases = [
      // LUNES
      {
        id: 'SIS704', dia: 'Lunes', curso: 'Redes y Conectividad', profesor: 'Ing. Torres',
        aula: 'Laboratorio de Redes L-203', capacidad: 30, tieneAscensor: true, horario: '08:00 - 11:15',
        asientos: this.generarMapaAsientos(3, 10)
      },
      // MARTES
      {
        id: 'SIS705', dia: 'Martes', curso: 'Base de Datos II', profesor: 'Ing. Gómez',
        aula: 'Laboratorio B-105', capacidad: 35, tieneAscensor: true, horario: '15:00 - 18:15',
        asientos: this.generarMapaAsientos(4, 8)
      },
      // MIÉRCOLES
      {
        id: 'SIS706', dia: 'Miércoles', curso: 'Programación Web II', profesor: 'Ing. Soto',
        aula: 'Laboratorio de Cómputo B-301', capacidad: 40, tieneAscensor: true, horario: '18:00 - 21:15',
        asientos: this.generarMapaAsientos(4, 10)
      },
      // JUEVES (Tus cursos originales conservados)
      {
        id: 'SIS701', dia: 'Jueves', curso: 'Inteligencia de Negocios (BI)', profesor: 'Ing. Fernández',
        aula: 'Laboratorio de Cómputo B-302', capacidad: 40, tieneAscensor: true, horario: '14:00 - 17:30',
        asientos: this.generarMapaAsientos(4, 10)
      },
      {
        id: 'SIS702', dia: 'Jueves', curso: 'Arquitectura de Software', profesor: 'Lic. Norma',
        aula: 'Aula Teórica A-405', capacidad: 30, tieneAscensor: false, horario: '18:00 - 21:15',
        asientos: this.generarMapaAsientos(3, 10)
      },
      // VIERNES
      {
        id: 'SIS707', dia: 'Viernes', curso: 'Seguridad Informática', profesor: 'Ing. Castillo',
        aula: 'Laboratorio B-204', capacidad: 25, tieneAscensor: true, horario: '08:00 - 11:15',
        asientos: this.generarMapaAsientos(3, 8)
      },
      // SÁBADO (Tus cursos originales conservados)
      {
        id: 'SIS703', dia: 'Sábado', curso: 'Gestión y Calidad de Datos', profesor: 'Dr. Silva',
        aula: 'Auditorio Principal', capacidad: 50, tieneAscensor: true, horario: '08:00 - 12:00',
        asientos: this.generarMapaAsientos(5, 10)
      },
      {
        id: 'SIS708', dia: 'Sábado', curso: 'Taller de Tesis I', profesor: 'Ing. Vidal',
        aula: 'Aula A-202', capacidad: 20, tieneAscensor: false, horario: '14:00 - 17:00',
        asientos: this.generarMapaAsientos(2, 10)
      }
    ];
  }

  generarMapaAsientos(filas: number, columnas: number): Asiento[] {
    const letras = ['A', 'B', 'C', 'D', 'E', 'F'];
    let mapa: Asiento[] = [];
    for (let i = 0; i < filas; i++) {
      for (let j = 1; j <= columnas; j++) {
        mapa.push({
          id: `${letras[i]}${j}`,
          estado: Math.random() > 0.65 ? 'ocupado' : 'disponible', 
          tipo: i === 0 ? 'preferencial' : 'estandar' // Primera fila preferencial
        });
      }
    }
    return mapa;
  }

  alCambiarDia() {
    this.clasesDelDia = this.baseDatosClases.filter(c => c.dia === this.diaSeleccionado);
    if (this.clasesDelDia.length > 0) {
      this.seleccionarClase(this.clasesDelDia[0]);
    } else {
      this.claseActual = null as any;
      this.asientosSeleccionados = [];
    }
  }

  seleccionarClase(clase: ClaseAsignada) {
    this.claseActual = clase;
    this.asientosSeleccionados = []; 
  }

  toggleAsiento(asiento: Asiento) {
    if (asiento.estado === 'ocupado') return;

    if (asiento.estado === 'disponible') {
      asiento.estado = 'seleccionado';
      this.asientosSeleccionados.push(asiento);
    } else if (asiento.estado === 'seleccionado') {
      asiento.estado = 'disponible';
      this.asientosSeleccionados = this.asientosSeleccionados.filter(a => a.id !== asiento.id);
    }
  }

  confirmarReserva() {
    if (this.asientosSeleccionados.length === 0) return;
    
    const ids = this.asientosSeleccionados.map(a => a.id).join(', ');
    
    // 1. Recuperamos el código que guardamos en el Login
    // Si no hay nada, por seguridad enviará "N00361032" (tu código) en lugar de ceros
    const upnLogueado = localStorage.getItem('usuarioUpn') || 'N00361032';

    const reservaParaBD = {
      curso: this.claseActual.curso,
      aula: this.claseActual.aula,
      horario: this.claseActual.horario,
      asientos: ids,
      usuarioUpn: upnLogueado // Este nombre debe ser igual al de tu Reserva.java
    };

    this.reservaService.guardarReservaBD(reservaParaBD).subscribe({
      next: (res) => {
        alert(`✅ ¡Reserva Exitosa!\n\nEstudiante: ${upnLogueado}\nAsientos: ${ids}`);
        this.asientosSeleccionados.forEach(a => a.estado = 'ocupado');
        this.asientosSeleccionados = [];
      },
      error: (err) => {
        alert('Hubo un error al registrar la reserva en MySQL.');
        console.error(err);
      }
    });
  }

  volverAlMapa() { this.router.navigate(['/mapa']); }
}