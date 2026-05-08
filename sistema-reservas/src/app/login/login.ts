import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class LoginComponent {
  constructor(private router: Router) {}

  iniciarSesion() {
    this.router.navigate(['/perfil']);
  }

  irAlRegistro() {
    this.router.navigate(['/registro']);
  }
}