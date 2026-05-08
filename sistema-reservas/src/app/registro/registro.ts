import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registro',
  standalone: true,
  templateUrl: './registro.html', // <-- Cambiado
  styleUrls: ['./registro.css']   // <-- Cambiado
})
export class RegistroComponent {
  constructor(private router: Router) {}

  crearCuenta() {
    alert('¡Cuenta creada con éxito!');
    this.router.navigate(['/perfil']);
  }

  irAlLogin() {
    this.router.navigate(['/login']);
  }
}