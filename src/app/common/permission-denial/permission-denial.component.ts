import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-permission-denial',
  templateUrl: './permission-denial.component.html',
  styleUrls: ['./permission-denial.component.scss'],
})
export class PermissionDenialComponent implements OnInit {
  constructor(private _location: Location) {}

  ngOnInit(): void {}

  goBack() {
    this._location.back();
  }
}
