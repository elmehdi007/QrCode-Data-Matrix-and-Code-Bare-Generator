import { Injectable } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { filter, map } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

@Injectable({
  providedIn: 'root'
})

export class TitleService {
  defaultTitle = 'My App'

  private stateSideBare = new BehaviorSubject<String>('');
  currentState = this.stateSideBare.asObservable();

  changeCurrentStateSideBare(state: String) { this.stateSideBare.next(state) }

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private title: Title
  ) { }

  boot() {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      map(() => {
        let child = this.activatedRoute.firstChild;
        while (child.firstChild) {
          child = child.firstChild;
        }
        if (child.snapshot.data['title']) {
          return child.snapshot.data['title'];
        }
        return this.defaultTitle;
      }),
    ).subscribe((currentTitle) => {
      this.title.setTitle(currentTitle);
      this.changeCurrentStateSideBare(currentTitle);
    });
  }

  /*
    boot() {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      map(() => this.activeRoute),
      map(route => route.firstChild),
      switchMap(route => route.data),
      map((data) => {
        return data && data.title ? `${data.title} • ${this.default_title}` : this.default_title;
      })
    ).subscribe((current_title) => this.title.setTitle(current_title));
  }*/
}