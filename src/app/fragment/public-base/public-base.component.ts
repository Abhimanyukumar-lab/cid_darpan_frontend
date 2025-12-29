import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { ApiCallerService } from 'src/app/services/api-caller.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-public-base',
  templateUrl: './public-base.component.html',
  styleUrls: ['./public-base.component.scss'],
})
export class PublicBaseComponent implements OnInit {
  style = environment.STYLE;

  url = this.router.url;

  constructor(private apiCaller: ApiCallerService, private router: Router) {
    this.apiCaller
      .apiGetCall('public/getUpdateVisitors', false, false)
      .subscribe((data) => {});
  }

  ngOnInit(): void {
    this.router.events.subscribe((val) => {
      if (val instanceof NavigationEnd) {
        this.url = this.router.url;
      }
    });
  }
}
