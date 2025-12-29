import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Permissions } from 'src/app/models/Permissions';
import { GlobalFunctionsService } from 'src/app/services/global-functions.service';
import { AppConstants } from 'src/app/storage/localdata/AppConstants';

@Component({
  selector: 'app-admin-crime-type',
  templateUrl: './admin-crime-type.component.html',
  styleUrls: ['./admin-crime-type.component.scss'],
})
export class AdminCrimeTypeComponent implements OnInit {
  page = null;
  rows = null;
  columns = [];
  path: string = AppConstants.UNDER_DEVELOPMENT;
  permissions: Permissions = new Permissions();

  constructor(private global: GlobalFunctionsService, private router: Router) {}

  ngOnInit(): void {}
}
