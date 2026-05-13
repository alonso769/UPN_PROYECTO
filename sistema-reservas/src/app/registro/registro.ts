import { Component } from '@angular/core';
import { Router } from '@angular/router';
// 1. Importamos FormsModule y tu Servicio
import { FormsModule } from '@angular/forms'; 
import { ReservaService } from '../service/reserva';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [FormsModule], // 2. Agregamos el FormsModule aquí
  templateUrl: './registro.html',
  styleUrls: ['./registro.css']
})
export class RegistroComponent {
  
  // 3. Objeto que almacenará lo que el usuario escriba
  nuevoUsuario = {
    nombre: '',
    correo: '', // Usaremos el Código UPN como si fuera su correo/usuario
    password: ''
  };

  // 4. Inyectamos el servicio en el constructor
  constructor(private router: Router, private reservaService: ReservaService) {}

  crearCuenta() {
    // 5. Llamamos a tu API en Eclipse
    this.reservaService.registrarUsuario(this.nuevoUsuario).subscribe({
      next: (respuesta) => {
        alert('¡Cuenta creada con éxito y guardada en MySQL!');
        // Si todo sale bien, lo mandamos al Login
        this.router.navigate(['/login']);
      },
      error: (err) => {
        alert('Hubo un error al registrar el usuario.');
        console.error(err);
      }
    });
  }

  irAlLogin() {
    this.router.navigate(['/login']);
  }
}