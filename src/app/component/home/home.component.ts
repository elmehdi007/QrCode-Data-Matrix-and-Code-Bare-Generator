import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { TitleService } from 'src/app/Services/title.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  headerTitle: String = '';

  constructor(private titleService: TitleService
  ) {
    this.titleService.boot();
    this.headerTitle = this.titleService.defaultTitle;
    this.titleService.currentState.subscribe(state => this.headerTitle = state);
  }

  ngOnInit(): void {}

}
