import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms'; // 1. IMPORTANTE: Para capturar texto

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule], // 2. IMPORTANTE: Agregamos el módulo aquí
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class LoginComponent {
  
  // 3. Esta variable guardará lo que escribas en el Login
  codigoUPN: string = '';

  constructor(private router: Router) {}

  iniciarSesion() {
    // 4. Si escribiste algo, lo guardamos en la "mochila" del navegador
    if (this.codigoUPN) {
      localStorage.setItem('usuarioUpn', this.codigoUPN);
    }
    
    // 5. Navegamos al perfil o mapa
    this.router.navigate(['/mapa']); 
  }

  irAlRegistro() {
    this.router.navigate(['/registro']);
  }
}