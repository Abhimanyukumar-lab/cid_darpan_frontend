import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Permissions } from 'src/app/models/Permissions';
import { GlobalFunctionsService } from 'src/app/services/global-functions.service';
import { AppConstants } from 'src/app/storage/localdata/AppConstants';

@Component({
  selector: 'app-admin-crime-report',
  templateUrl: './admin-crime-report.component.html',
  styleUrls: ['./admin-crime-report.component.scss'],
})
export class AdminCrimeReportComponent implements OnInit {
  page = null;
  rows = null;
  columns = [];
  path: string = AppConstants.UNDER_DEVELOPMENT;
  permissions: Permissions = new Permissions();

  constructor(private global: GlobalFunctionsService, private router: Router) {}

  ngOnInit(): void {}
}
