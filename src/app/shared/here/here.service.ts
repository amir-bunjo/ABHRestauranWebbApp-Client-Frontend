import { Injectable } from '@angular/core';

declare var H: any;

@Injectable({
    providedIn: 'root'
})
export class HereService {

    public platform: any;
    public geocoder: any;
    APP_ID = "QCGjWJRx6Fe2QW7B0XPv";
    APP_CODE = "0bK1wYuZnXcEMGmY4uD9Kw";
    AUTOCOMPLETION_URL = 'https://autocomplete.geocoder.api.here.com/6.2/suggest.json';
    ajaxRequest = new XMLHttpRequest();
    httpReq = new XMLHttpRequest();
    optionsAutocomplete: string[] = [];
    query = '';

    public constructor() {
        this.platform = new H.service.Platform({
            "app_id": this.APP_ID,// QCGjWJRx6Fe2QW7B0XPv
            "app_code": this.APP_CODE, // 0bK1wYuZnXcEMGmY4uD9Kw
            useHTTPS: true
        });
        this.geocoder = this.platform.getGeocodingService();
       
    }

    public getAddress(query: string) {
      return new Promise((resolve, reject) => {
          this.geocoder.geocode({ searchText: query }, result => {
              if(result.Response.View.length > 0) {
                  if(result.Response.View[0].Result.length > 0) {
                      resolve(result.Response.View[0].Result);
                  } else {
                      reject({ message: "no results found" });
                  }
              } else {
                  reject({ message: "no results found" });
              }
          }, error => {
              reject(error);
          });
      });
  }
  public getAddressFromLatLng(query: string) {
    console.log(query)
    return new Promise((resolve, reject) => {
        this.geocoder.reverseGeocode({ prox: query, mode: "retrieveAddress" }, result => {
            if(result.Response.View.length > 0) {
                if(result.Response.View[0].Result.length > 0) {
                    resolve(result.Response.View[0].Result);
                } else {
                    reject({ message: "no results found" });
                }
            } else {
                reject({ message: "no results found" });
            }
        }, error => {
            reject(error);
        });
    });
}

findSuggestion(query: string){

        var params = '?' +
          'query=' +  encodeURIComponent(query) +   // The search text which is the basis of the query
          '&maxresults=5' +  // The upper limit the for number of suggestions to be included 
          '&app_id=' + this.APP_ID +
          '&app_code=' + this.APP_CODE;

        this.httpReq.open('GET', this.AUTOCOMPLETION_URL + params );
        this.httpReq.onreadystatechange = () => { 
          if ( this.httpReq.responseText != "undefined" ) {
          var help: any = [];
            try{
                help = JSON.parse(this.httpReq.response);
                this.loadOptionsAutocomplete(help);
            }catch{
            }
          
          }
     
        }
        this.httpReq.send();
        return  this.optionsAutocomplete;
      }

loadOptionsAutocomplete(help: any){
      let lengthOfSugg = help.suggestions!== undefined ? help.suggestions.length !== undefined: 0
      
      for(let i=0;i< help.suggestions.length; i++){
        let matchLevel = help.suggestions[i].matchLevel;
        let street = help.suggestions[i].address.street;
        let city = help.suggestions[i].address.city!==null ? help.suggestions[i].address.city : "";
        let country = help.suggestions[i].address.country ;
        var arrayOfSuggestion = [];
        arrayOfSuggestion =  help.suggestions[i].label.split(',');
       this.optionsAutocomplete[i] = arrayOfSuggestion[arrayOfSuggestion.length -1];
          if(arrayOfSuggestion.length - 2 >=0)
            this.optionsAutocomplete[i] += ',' + arrayOfSuggestion[arrayOfSuggestion.length -2]; 
      }
   
    }











}
