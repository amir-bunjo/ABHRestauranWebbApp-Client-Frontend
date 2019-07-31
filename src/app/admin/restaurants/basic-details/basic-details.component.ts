import { Component, OnInit, Output, EventEmitter, ViewChild, ElementRef, NgModule, Input } from '@angular/core';
import 'node_modules/leaflet-routing-machine/dist/leaflet-routing-machine.js'
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HereService } from 'src/app/shared/here/here.service';
import { Observable } from 'rxjs';
//import {MatAutocompleteModule} from '@angular/material/autocomplete';



declare let L;



@Component({
  selector: 'app-basic-details',
  templateUrl: './basic-details.component.html',
  styleUrls: ['./basic-details.component.css']
})
export class BasicDetailsComponent implements OnInit {
  expanded: boolean = false;
  @ViewChild('uploadLogo') inputFieldLogo: ElementRef;
  @ViewChild('uploadCover') inputFieldCover: ElementRef;
  @Output() dataEmitter = new EventEmitter();
  private eventsSubscription: any
  @Input() events: Observable<any>;
  
  restaurantId;
  optionsAutocomplete = [];
  message;
  logoImageString;
  coverImageString;
  imageNames = new FormData();
  selectedupload;
  coordinates: Coordinates = new Coordinates();
  map:any;
  myMarker: any;
  
  basicDetailForm: FormGroup

  constructor(private hereService: HereService) { }

  ngOnInit() {
    
    this.basicDetailForm = new FormGroup({
      'name': new FormControl(null,Validators.required),
      'pricerange': new FormControl(null,Validators.required),
      'category': new FormControl(null,Validators.required),
      'description': new FormControl(null,Validators.required),
      'searchAdress': new FormControl(null)


    })
   // this.eventsSubscription = this.events.subscribe(({data}) => this.loadMap(data.latitude,data.longitude,'newmap'))

    this.loadMap(45.8616156, 17.417399,'map');
  }

  valuechange() {
    console.log('clicked search' + this.basicDetailForm.value.searchAdress);

    let searchString = this.basicDetailForm.value.searchAdress;

    this.hereService.getAddress(searchString).then(result => { 
      var coordinates = new Coordinates();
      let adress = result;
      coordinates.latitude = adress[0].Location.DisplayPosition.Latitude;
      coordinates.longitude = adress[0].Location.DisplayPosition.Longitude;
      console.log( coordinates );
      this.loadMap(coordinates.latitude,coordinates.longitude,'newmap');
      
    });
    }

  newInput(event){
    var textInput: string = event.target.value;
    if(textInput !== "")
      this.optionsAutocomplete = this.hereService.findSuggestion(textInput);
    else
      this.optionsAutocomplete = [];
    //this.searchAddres = event.target.value;
  }

  changeMapCenter(lat,longt){

    document.getElementById('map').innerHTML = "<div id='newmap' style='width: 100%; height: 100%;'></div>";
    var osmUrl = 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
                    osmAttribution = 'Map data © <a href="http://openstreetmap.org">OpenStreetMap</a> contributors,' +
                        ' <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>',
    osmLayer = new L.TileLayer(osmUrl, {maxZoom: 18, attribution: osmAttribution});
    this.map = new L.Map('newmap');
    this.map.setView(new L.LatLng(lat,longt), 15 );
    this.map.addLayer(osmLayer);
  
    // this.loadMapMarkers(lat,longt);
   
  }
  




  loadMap(latitude, longitude, mapId) {
    //this.coordinates = new Coordinates();
    if(mapId==='newmap')
      document.getElementById('map').innerHTML = "<div id='newmap' style='width: 100%; height: 100%;'></div>";
    var LeafIcon = L.Icon.extend({
      options: {
        iconSize: [50, 60],
        shadowSize: [50, 64],
        iconAnchor: [22, 94],
        shadowAnchor: [4, 62],
        popupAnchor: [-3, -76]
      }
    });
    let that = this;
    var markerIcon = new LeafIcon({
      iconUrl: './assets/img/map-marker.png'
    });
    this.map = new L.map(mapId).setView([latitude, longitude],mapId==='newmap' ?16:3);
    L.tileLayer('https://{s}.tile.osm.org/{z}/{x}/{y}.png',
      { attribution: 'OSM' }
    ).addTo(this.map);
    if(mapId==='newmap')
    var myMarker = L.marker([latitude, longitude], { icon: markerIcon, draggable: true })
      .addTo(this.map)
      .on('dragend', function () {
        var coord = String(myMarker.getLatLng()).split(',');
        console.log(coord);
        var lat = coord[0].split('(')[1];
        console.log(lat);
        var lng = coord[1].split(')')[0];        
        console.log(lng);
        that.coordinates.latitude =lat;
        that.coordinates.longitude + lng;
        sessionStorage.setItem('latitude',lat);
        sessionStorage.setItem('longitude',lng);

      });

    if(myMarker!==undefined)
     myMarker.bindPopup("<b>Move a marker to set location of restaurant!</b>").openPopup();
  }

  setCoordinates() {
    console.log('should set coord');
  }

  openUploadLogo(): void {
    this.inputFieldLogo.nativeElement.click();

  }

  openUploadCover(): void {
    this.inputFieldCover.nativeElement.click();
  }


  onUploadChange(evt: any, type) {
    this.dataEmitter.emit('test');
    this.imageNames.append(type,evt.target.files[0].name);
    console.log(evt.target.files[0].name + ' type: ' + type);
    const file = evt.target.files[0];
    if (file) {
      const reader = new FileReader();
      this.selectedupload = type;
      reader.onload = this.handleReaderLoaded.bind(this);
      reader.readAsBinaryString(file);
    }
  }

  handleReaderLoaded(e) {

    if (this.selectedupload === 'logo')
      this.logoImageString = 'data:image/png;base64,' + btoa(e.target.result);
    else if (this.selectedupload === 'cover')
      this.coverImageString = 'data:image/png;base64,' + btoa(e.target.result);

    console.log(this.coverImageString)
    // console.log('type' + type)  
    // console.log(this.coverImageString);
  }

  showCheckboxes() {

    {
      var checkboxes = document.getElementById("checkboxes");
      if (!this.expanded) {
        checkboxes.style.display = "block";
        this.expanded = true;
      } else {
        checkboxes.style.display = "none";
        this.expanded = false;
      }
    }

  }

}


export class Coordinates {
  latitude: any;
  longitude: any;
}