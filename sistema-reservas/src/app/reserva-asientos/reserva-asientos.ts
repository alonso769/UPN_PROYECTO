import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

export interface Asiento {
  id: string;
  estado: 'disponible' | 'ocupado' | 'seleccionado';
  tipo: 'estandar' | 'preferencial'; // Preferencial para primeras filas
}

export interface ClaseAsignada {
  id: string;
  dia: string;
  curso: string;
  profesor: string;
  aula: string;
  capacidad: number;
  tieneAscensor: boolean;
  asientos: Asiento[];
}

@Component({
  selector: 'app-reserva-asientos',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './reserva-asientos.html',
  styleUrl: './reserva-asientos.css'
})
export class ReservaAsientos implements OnInit {
  diasSemana = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
  diaSeleccionado = 'Jueves'; // Empezamos con un día por defecto
  
  baseDatosClases: ClaseAsignada[] = [];
  clasesDelDia: ClaseAsignada[] = [];
  claseActual!: ClaseAsignada;
  
  asientosSeleccionados: Asiento[] = [];

  ngOnInit(): void {
    this.generarBaseDeDatos();
    this.alCambiarDia();
  }

  // Generamos datos complejos que simulan una base de datos real
  generarBaseDeDatos() {
    this.baseDatosClases = [
      {
        id: 'C1', dia: 'Jueves', curso: 'Inteligencia de Negocios', profesor: 'Ing. Fernández',
        aula: 'Laboratorio B-302', capacidad: 40, tieneAscensor: true,
        asientos: this.generarMapaAsientos(4, 10)
      },
      {
        id: 'C2', dia: 'Jueves', curso: 'Arquitectura de Software', profesor: 'Lic. Norma',
        aula: 'Pabellón A-105', capacidad: 30, tieneAscensor: false,
        asientos: this.generarMapaAsientos(3, 10)
      },
      {
        id: 'C3', dia: 'Sábado', curso: 'Gestión de Proyectos TI', profesor: 'Dr. Silva',
        aula: 'Auditorio Principal', capacidad: 50, tieneAscensor: true,
        asientos: this.generarMapaAsientos(5, 10)
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
          estado: Math.random() > 0.75 ? 'ocupado' : 'disponible', // 25% de ocupación aleatoria
          tipo: i === 0 ? 'preferencial' : 'estandar' // Primera fila es preferencial
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
      this.asientosSeleccionados = [];
    }
  }

  seleccionarClase(clase: ClaseAsignada) {
    this.claseActual = clase;
    this.asientosSeleccionados = []; // Reiniciamos selección al cambiar de clase
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
    alert(`¡Reserva Exitosa!\n\nCurso: ${this.claseActual.curso}\nAula: ${this.claseActual.aula}\nAsientos: ${ids}`);
    
    this.asientosSeleccionados.forEach(a => a.estado = 'ocupado');
    this.asientosSeleccionados = [];
  }
}