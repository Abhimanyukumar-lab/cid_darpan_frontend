import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-news-event-details',
  templateUrl: './news-event-details.component.html',
  styleUrls: ['./news-event-details.component.scss'],
})
export class NewsEventDetailsComponent {
  news: any;

  constructor(private router: Router) {
    this.news = JSON.parse(localStorage.getItem('news'));

    if (!this.news) {
      this.router.navigate(['/newsEvent']);
    }
  }

  goBack = () => {
    localStorage.removeItem('news');
    this.router.navigate(['/newsEvent']);
  };
}
