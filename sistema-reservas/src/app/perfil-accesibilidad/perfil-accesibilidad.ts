import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-perfil-accesibilidad',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './perfil-accesibilidad.html',
  styleUrls: ['./perfil-accesibilidad.css']
})
export class PerfilAccesibilidadComponent {
  constructor(private router: Router) {}

  guardarYContinuar() {
    this.router.navigate(['/mapa']);
  }
}