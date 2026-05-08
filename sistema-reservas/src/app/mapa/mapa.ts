import { Component, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as L from 'leaflet';

@Component({
  selector: 'app-mapa',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './mapa.html',
  styleUrls: ['./mapa.css']
})
export class MapaComponent implements AfterViewInit {
  private map!: L.Map;
  private routeLine!: L.Polyline;

  // Puntos clave del campus UPN (Coordenadas simuladas)
  private salas = [
    { id: 1, nombre: 'Pabellón A - Aulas Teóricas', coords: [-12.0601, -77.0487] as L.LatLngExpression },
    { id: 2, nombre: 'Pabellón B - Laboratorios', coords: [-12.0608, -77.0495] as L.LatLngExpression },
    { id: 3, nombre: 'Cafetería Central', coords: [-12.0605, -77.0480] as L.LatLngExpression }
  ];

  ngAfterViewInit(): void {
    this.initMap();
    this.addMarkers();
    this.fixLeafletIcons(); // Soluciona el bug de iconos invisibles en Angular
  }

  private initMap(): void {
    // Centramos el mapa en el campus con un zoom cercano
    this.map = L.map('mapa-upn', {
      center: [-12.0605, -77.0487],
      zoom: 18
    });

    // Capa visual del mapa
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 20,
      attribution: '© UPN Ecosistema Digital'
    }).addTo(this.map);
  }

  private addMarkers(): void {
    this.salas.forEach(sala => {
      L.marker(sala.coords)
        .addTo(this.map)
        .bindPopup(`<b>${sala.nombre}</b><br>Haz clic en "Trazar Ruta" para llegar aquí.`);
    });
  }

  trazarRuta() {
    // Si ya hay una línea dibujada, la limpiamos
    if (this.routeLine) {
      this.map.removeLayer(this.routeLine);
    }

    // Trazamos ruta desde Pabellón A hasta Laboratorios
    const inicio = this.salas[0].coords;
    const destino = this.salas[1].coords;

    this.routeLine = L.polyline([inicio, destino], {
      color: '#002D72', // Azul institucional UPN
      weight: 6,
      opacity: 0.8,
      dashArray: '10, 10' // Efecto de línea punteada (caminando)
    }).addTo(this.map);

    // Ajustar la cámara para que se vea toda la ruta
    this.map.fitBounds(this.routeLine.getBounds(), { padding: [50, 50] });
  }

  private fixLeafletIcons() {
    const iconRetinaUrl = 'assets/marker-icon-2x.png';
    const iconUrl = 'assets/marker-icon.png';
    const shadowUrl = 'assets/marker-shadow.png';
    const iconDefault = L.icon({
      iconRetinaUrl,
      iconUrl,
      shadowUrl,
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      tooltipAnchor: [16, -28],
      shadowSize: [41, 41]
    });
    L.Marker.prototype.options.icon = iconDefault;
  }
}
