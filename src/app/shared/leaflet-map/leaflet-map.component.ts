import { Component, OnInit } from '@angular/core';
import 'node_modules/leaflet-routing-machine/dist/leaflet-routing-machine.js'

declare let L;

@Component({
  selector: 'app-leaflet-map',
  templateUrl: './leaflet-map.component.html',
  styleUrls: ['./leaflet-map.component.css']
})



export class LeafletMapComponent implements OnInit {

  //map: any;

  constructor() { }

  ngOnInit() {

   this.loadMap();
  }

  loadMap() {
    const map = new L.map('map').setView([43.8616156,18.417399], 16);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

  }

}
