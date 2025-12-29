// filter-dialog.component.ts
import { Component, EventEmitter, Output } from '@angular/core';
import { ApiCallerService } from 'src/app/services/api-caller.service';
import { Store } from '@ngrx/store';
import { AppLoadderShow, AppLoadderHide } from 'src/app/storage/actions/app.actions';
import { ToasterService } from 'src/app/services/toaster.service';

@Component({
  selector: 'app-filter-dialog',
  templateUrl: './filter-dialog.component.html',
  styleUrls: ['./filter-dialog.component.scss']
})
export class FilterDialogComponent {
  districts: any[] = [];
  subdivisions: any[] = [];
  policeStations: any[] = [];
  srOptions = ['SR', 'NSR'];

  selectedSR = '';
  selectedDistrict = '';
  selectedSubdivision = '';
  selectedPoliceStation = '';

  isLoading = false;

  @Output() closed = new EventEmitter<void>();

  constructor(
    private apiCaller: ApiCallerService,
    private appStore: Store<{ app: any }>,
    private toaster: ToasterService
  ) {}

  ngOnInit(): void {
    this.loadFilters();
  }

  loadFilters() {
    this.isLoading = true;
    
    // Load districts
    this.apiCaller.apiGetCall('getDistricts', true).subscribe({
      next: (res) => {
        this.districts = res.districtDTOs || [];
      },
      error: (error) => {
        console.error('Failed to load districts:', error);
        this.toaster.getToastMessage('Failed to load districts', 'error', 3000, 'bottom');
      }
    });

    // Load subdivisions
    this.apiCaller.apiGetCall('getSubdivisions', true).subscribe({
      next: (res) => {
        this.subdivisions = res.subdivisionDTOs || [];
      },
      error: (error) => {
        console.error('Failed to load subdivisions:', error);
        this.toaster.getToastMessage('Failed to load subdivisions', 'error', 3000, 'bottom');
      }
    });

    // Load police stations
    this.apiCaller.apiGetCall('getPoliceStations', true).subscribe({
      next: (res) => {
        this.policeStations = res.stationDtos || [];
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Failed to load police stations:', error);
        this.toaster.getToastMessage('Failed to load police stations', 'error', 3000, 'bottom');
        this.isLoading = false;
      }
    });
  }

  applyFilters() {
    const filters = {
      srType: this.selectedSR,
      districtName: this.selectedDistrict,
      subdivisionName: this.selectedSubdivision,
      policeStationName: this.selectedPoliceStation
    };

    this.downloadReport(filters);
  }

  downloadReport(filters: any) {
    this.appStore.dispatch(new AppLoadderShow({}));
    this.isLoading = true;

    this.apiCaller.apiPostCall('case/export', filters, true)
      .subscribe({
        next: (response: any) => {
          this.handleFileDownload(response);
          this.toaster.getToastMessage('Report downloaded successfully', 'success', 3000, 'bottom');
          this.isLoading = false;
          this.close();
        },
        error: (error: any) => {
          console.error('Download failed:', error);
          this.toaster.getToastMessage('Failed to download report', 'error', 3000, 'bottom');
          this.isLoading = false;
          this.appStore.dispatch(new AppLoadderHide({}));
        },
        complete: () => {
          this.appStore.dispatch(new AppLoadderHide({}));
        }
      });
  }

  handleFileDownload(response: any) {
    // Handle file download based on your API response
    if (response instanceof Blob) {
      const url = window.URL.createObjectURL(response);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'case_report.xlsx';
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    }
  }

  close() {
    this.closed.emit();
  }
}