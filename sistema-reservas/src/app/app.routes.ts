import { Routes } from '@angular/router';
import { LoginComponent } from './login/login'; 
import { PerfilAccesibilidadComponent } from './perfil-accesibilidad/perfil-accesibilidad';
import { MapaComponent } from './mapa/mapa';
import { ReservaAsientos } from './reserva-asientos/reserva-asientos'; 
import { RegistroComponent } from './registro/registro'; // <-- Le quitamos el .component al final

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' }, 
  { path: 'login', component: LoginComponent },
  { path: 'registro', component: RegistroComponent }, // <-- Nueva ruta
  { path: 'perfil', component: PerfilAccesibilidadComponent },
  { path: 'mapa', component: MapaComponent },
  { path: 'reservas', component: ReservaAsientos }
];