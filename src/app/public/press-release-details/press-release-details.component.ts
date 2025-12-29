import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-press-release-details',
  templateUrl: './press-release-details.component.html',
  styleUrls: ['./press-release-details.component.scss'],
})
export class PressReleaseDetailsComponent {
  pressRelease: any;

  constructor(private router: Router) {
    this.pressRelease = JSON.parse(localStorage.getItem('pressRelease'));

    if (!this.pressRelease) {
      this.router.navigate(['/pressRelease']);
    }
  }

  goBack = () => {
    localStorage.removeItem('pressRelease');
    this.router.navigate(['/pressRelease']);
  };
}
