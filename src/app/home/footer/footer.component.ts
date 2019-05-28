import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  template: `
    <footer class="footer" style=" background: #131D24;width:100%; height:200px">
    <div class="container" >
      <div class="row" style="padding-top:5%">
        <p style="margin-right:2%;color: #FFFF;">Privacy Policy</p>
        <p style="margin-right:2%;color: #FFFF;">Terms of use</p>
        <p style="margin-right:2%;color: #FFFF;">Site map</p>
        <p style="margin-right:2%;color: #FFFF;">Mobile site</p>
        <div style="margin-left:15%"></div>
        <p style="margin-right:2%;color: #FFFF;">About us</p>
        <p style="margin-right:2%;color: #FFFF;">Blog</p>
        <p style="margin-right:2%;color: #FFFF;">Carrers</p>
        <p style="margin-right:2%;color: #FFFF;">Press</p>
        <p style="margin-right:2%;color: #FFFF;">Advertise</p>
     </div>
     <p style="margin-right:2%;color: #FFFF;">Copyright ©2016 All rights reserved.</p>
    </div>
    </footer>
  `,
  styles: []
})
export class FooterComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
