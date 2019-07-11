import { Component, OnInit, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import 'node_modules/leaflet-routing-machine/dist/leaflet-routing-machine.js'


declare let L;

@Component({
  selector: 'app-basic-details',
  templateUrl: './basic-details.component.html',
  styleUrls: ['./basic-details.component.css']
})
export class BasicDetailsComponent implements OnInit {
  @ViewChild('uploadLogo') inputFieldLogo: ElementRef;
  @ViewChild('uploadCover') inputFieldCover: ElementRef;

  logoImageString;
  coverImageString;
  selectedupload;

  constructor() { }

  ngOnInit() {

    this.loadMap(45.8616156, 17.417399);
  }

  loadMap(latitude, longitude) {
    var icon = {
      icon: L.icon({
        iconSize: [50, 60],
        iconAnchor: [20, 20],
        iconUrl: './assets/img/map-marker.png'
      })
    };
    const map = new L.map('map').setView([latitude, longitude], 16);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);
    const marker = L.marker([latitude, longitude], icon).addTo(map);
    marker.bindPopup("<b>Here is location of restaurant!</b>").openPopup();
  }

  openUploadLogo(): void {
    this.inputFieldLogo.nativeElement.click();

  }

  openUploadCover(): void {
    this.inputFieldCover.nativeElement.click();
  }


  onUploadChange(evt: any,type) {
    const file = evt.target.files[0];
    if (file) {
      const reader = new FileReader();
      this.selectedupload = type;
      reader.onload = this.handleReaderLoaded.bind(this);
      reader.readAsBinaryString(file);
    }
  }

  handleReaderLoaded(e) {
    
    if(this.selectedupload === 'logo')
      this.logoImageString = 'data:image/png;base64,' + btoa(e.target.result);
    else if(this.selectedupload === 'cover')
      this.coverImageString = 'data:image/png;base64,' + btoa(e.target.result);


   // console.log('type' + type)  
   // console.log(this.coverImageString);
  }

}
