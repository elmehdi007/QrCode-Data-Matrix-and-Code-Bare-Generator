import { Component, OnInit } from '@angular/core';
import { TitleService } from '../../Services/title.service';

@Component({
  selector: 'app-sidebare',
  templateUrl: './sidebare.component.html',
  styleUrls: ['./sidebare.component.css']
})
export class SidebareComponent implements OnInit {

  sideBarClosed = (window.screen.width < 600 || navigator.userAgent.indexOf("Mobi") > -1)?true:false;

  constructor() {}

  ngOnInit(): void {}
}
