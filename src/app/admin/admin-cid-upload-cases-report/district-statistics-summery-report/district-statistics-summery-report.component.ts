// import { Component, OnInit } from '@angular/core';
// import { ApiCallerService } from 'src/app/services/api-caller.service';
// import { AppConstants } from 'src/app/storage/localdata/AppConstants';

// @Component({
//   selector: 'app-district-statistics-summery-report',
//   templateUrl: './district-statistics-summery-report.component.html',
//   styleUrls: ['./district-statistics-summery-report.component.scss']
// })
// export class DistrictStatisticsSummeryReportComponent implements OnInit {

//   path: string = AppConstants.EXCEL_MODULE.COMPLETE_PERCENT_URL;

//   summaryList: any[] = [];
//   stateList: any[] = [];
//   filteredList: any[] = [];
//   errorMessage: string = '';

//   // Filter properties
//   districtFilter: string = '';
//   typeFilter: string = 'ALL';
//   sortBy: string = 'name';
//   sortOrder: 'asc' | 'desc' = 'asc';

//   // Available types for filter dropdown
//   availableTypes: string[] = ['ALL', 'SR', 'NSR'];

//   // Sort options
//   sortOptions = [
//     { value: 'name', label: 'District Name' },
//     { value: 'total', label: 'Total Cases' },
//     { value: 'completePercentage', label: '100% Complete' },
//     { value: 'above50Percentage', label: 'Above 50%' }
//   ];

//   constructor(private apiCaller: ApiCallerService) { }

//   ngOnInit(): void {
//     this.loadSummaryData();
//   }

//   loadSummaryData = () => {
//     this.apiCaller
//       .apiPostCall(this.path, {}, true)
//       .subscribe(
//         (data) => {
//           this.summaryList = data.data || [];
//           this.stateList = data.listData || [];
//           this.applyFilters();
//         },
//         (error) => {
//           this.errorMessage = 'Failed to load data. Please try again.';
//           console.error('Error loading data:', error);
//         }
//       );
//   };

//   // Calculate state totals for the header
//   getStateTotals() {
//     if (this.stateList.length === 0) return null;

//     const totals = {
//       total: 0,
//       complete100: 0,
//       above50: 0,
//       below50: 0
//     };

//     this.stateList.forEach(state => {
//       totals.total += state.total || 0;
//       totals.complete100 += state.complete100 || 0;
//       totals.above50 += state.above50 || 0;
//       totals.below50 += state.below50 || 0;
//     });

//     return totals;
//   }

//   // Apply filters and sorting
//   applyFilters() {
//     let filtered = [...this.summaryList];

//     // Filter by district name
//     if (this.districtFilter) {
//       filtered = filtered.filter(item =>
//         item.name.toLowerCase().includes(this.districtFilter.toLowerCase())
//       );
//     }

//     // Filter by type
//     if (this.typeFilter !== 'ALL') {
//       filtered = filtered.filter(item => item.type === this.typeFilter);
//     }

//     // Apply sorting
//     filtered.sort((a, b) => {
//       let aValue, bValue;

//       switch (this.sortBy) {
//         case 'name':
//           aValue = a.name;
//           bValue = b.name;
//           break;
//         case 'total':
//           aValue = a.total;
//           bValue = b.total;
//           break;
//         case 'completePercentage':
//           aValue = (a.complete100 / a.total) * 100;
//           bValue = (b.complete100 / b.total) * 100;
//           break;
//         case 'above50Percentage':
//           aValue = (a.above50 / a.total) * 100;
//           bValue = (b.above50 / b.total) * 100;
//           break;
//         default:
//           aValue = a.name;
//           bValue = b.name;
//       }

//       if (typeof aValue === 'string') {
//         return this.sortOrder === 'asc'
//           ? aValue.localeCompare(bValue)
//           : bValue.localeCompare(aValue);
//       } else {
//         return this.sortOrder === 'asc' ? aValue - bValue : bValue - aValue;
//       }
//     });

//     this.filteredList = filtered;
//   }

//   // Filter handlers
//   onDistrictFilterChange(event: any) {
//     this.districtFilter = event.target.value;
//     this.applyFilters();
//   }

//   onTypeFilterChange(event: any) {
//     this.typeFilter = event.target.value;
//     this.applyFilters();
//   }

//   onSortChange(event: any) {
//     this.sortBy = event.target.value;
//     this.applyFilters();
//   }

//   toggleSortOrder() {
//     this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc';
//     this.applyFilters();
//   }

//   // Calculate percentages for progress bars
//   calculatePercentage(partial: number, total: number): number {
//     return total > 0 ? (partial / total) * 100 : 0;
//   }

//   // Reset filters
//   resetFilters() {
//     this.districtFilter = '';
//     this.typeFilter = 'ALL';
//     this.sortBy = 'name';
//     this.sortOrder = 'asc';
//     this.applyFilters();
//   }
// }

import { Component, OnInit } from '@angular/core';
import { ApiCallerService } from 'src/app/services/api-caller.service';
import { AppConstants } from 'src/app/storage/localdata/AppConstants';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-district-statistics-summery-report',
  templateUrl: './district-statistics-summery-report.component.html',
  styleUrls: ['./district-statistics-summery-report.component.scss']
})
export class DistrictStatisticsSummeryReportComponent implements OnInit {

  path: string = AppConstants.EXCEL_MODULE.COMPLETE_PERCENT_URL;

  summaryList: any[] = [];
  stateList: any[] = [];
  filteredList: any[] = [];
  mergedDistrictList: any[] = [];
  errorMessage: string = '';

  // Filter properties
  districtFilter: string = '';
  typeFilter: string = 'ALL';
  sortBy: string = 'name';
  sortOrder: 'asc' | 'desc' = 'asc';

  // Available types for filter dropdown
  availableTypes: string[] = ['ALL', 'SR', 'NSR'];

  // Sort options
  sortOptions = [
    { value: 'name', label: 'District Name' },
    { value: 'total', label: 'Total Cases' },
    { value: 'completePercentage', label: '100% Complete' },
    { value: 'above50Percentage', label: 'Above 50%' }
  ];

  constructor(private apiCaller: ApiCallerService) { }

  ngOnInit(): void {
    this.loadSummaryData();
    console.log('Component initialized' + JSON.stringify(this.stateList));
  }

  loadSummaryData = () => {
    this.apiCaller
      .apiPostCall(this.path, {}, true)
      .subscribe(
        (data) => {
          this.summaryList = data.data || [];
          this.stateList = data.listData[0] || [];
          this.mergeDistricts();
          this.applyFilters();
        },
        (error) => {
          this.errorMessage = 'Failed to load data. Please try again.';
          console.error('Error loading data:', error);
        }
      );
  };

  // Merge districts with same name
  mergeDistricts() {
    const districtMap = new Map<string, any>();

    this.summaryList.forEach(item => {
      if (item.level === 'DISTRICT') {
        const districtName = item.name;

        if (districtMap.has(districtName)) {
          // Merge with existing district
          const existing = districtMap.get(districtName);
          existing.total += item.total;
          existing.complete100 += item.complete100;
          existing.above50 += item.above50;
          existing.below50 += item.below50;

          // Store individual type data for display
          if (!existing.types) {
            existing.types = [];
          }
          existing.types.push({
            type: item.type,
            total: item.total,
            complete100: item.complete100,
            above50: item.above50,
            below50: item.below50
          });
        } else {
          // Create new district entry
          districtMap.set(districtName, {
            ...item,
            types: [{
              type: item.type,
              total: item.total,
              complete100: item.complete100,
              above50: item.above50,
              below50: item.below50
            }]
          });
        }
      }
    });

    // Convert map to array
    this.mergedDistrictList = Array.from(districtMap.values());
  }

  // Calculate state totals for the header
  getStateTotals() {
    if (this.stateList.length === 0) return null;

    const totals = {
      total: 0,
      complete100: 0,
      above50: 0,
      below50: 0
    };

    this.stateList.forEach(state => {
      totals.total += state.total || 0;
      totals.complete100 += state.complete100 || 0;
      totals.above50 += state.above50 || 0;
      totals.below50 += state.below50 || 0;
    });

    return totals;
  }

  // Apply filters and sorting
  applyFilters() {
    let filtered = [...this.mergedDistrictList];

    // Filter by district name
    if (this.districtFilter) {
      filtered = filtered.filter(item =>
        item.name.toLowerCase().includes(this.districtFilter.toLowerCase())
      );
    }

    // Filter by type - for merged districts, we need to check if any type matches
    if (this.typeFilter !== 'ALL') {
      filtered = filtered.filter(item =>
        item.types.some((type: any) => type.type === this.typeFilter)
      );
    }

    // Apply sorting
    filtered.sort((a, b) => {
      let aValue, bValue;

      switch (this.sortBy) {
        case 'name':
          aValue = a.name;
          bValue = b.name;
          break;
        case 'total':
          aValue = a.total;
          bValue = b.total;
          break;
        case 'completePercentage':
          aValue = (a.complete100 / a.total) * 100;
          bValue = (b.complete100 / b.total) * 100;
          break;
        case 'above50Percentage':
          aValue = (a.above50 / a.total) * 100;
          bValue = (b.above50 / b.total) * 100;
          break;
        default:
          aValue = a.name;
          bValue = b.name;
      }

      if (typeof aValue === 'string') {
        return this.sortOrder === 'asc'
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      } else {
        return this.sortOrder === 'asc' ? aValue - bValue : bValue - aValue;
      }
    });

    this.filteredList = filtered;
  }

  // Filter handlers
  onDistrictFilterChange(event: any) {
    this.districtFilter = event.target.value;
    this.applyFilters();
  }

  onTypeFilterChange(event: any) {
    this.typeFilter = event.target.value;
    this.applyFilters();
  }

  onSortChange(event: any) {
    this.sortBy = event.target.value;
    this.applyFilters();
  }

  toggleSortOrder() {
    this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc';
    this.applyFilters();
  }

  // Calculate percentages for progress bars
  calculatePercentage(partial: number, total: number): number {
    return total > 0 ? (partial / total) * 100 : 0;
  }

  // Reset filters
  resetFilters() {
    this.districtFilter = '';
    this.typeFilter = 'ALL';
    this.sortBy = 'name';
    this.sortOrder = 'asc';
    this.applyFilters();
  }

  // Check if district has multiple types
  hasMultipleTypes(district: any): boolean {
    return district.types && district.types.length > 1;
  }

  // Get types as string for display
  getTypesString(district: any): string {
    if (!district.types) return district.type || '';
    return district.types.map((t: any) => t.type).join(', ');
  }


  // Excel Export Functionality
  exportToExcel() {
    if (!this.summaryList || this.summaryList.length === 0) {
      alert('No data available to export');
      return;
    }

    // Prepare data for Excel
    const excelData = this.prepareExcelData();

    // Create workbook and worksheet
    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.json_to_sheet(excelData);

    // Add worksheet to workbook
    XLSX.utils.book_append_sheet(workbook, worksheet, 'District Statistics');

    // Generate Excel file and trigger download
    const fileName = `District_Statistics_${new Date().toISOString().split('T')[0]}.xlsx`;
    XLSX.writeFile(workbook, fileName);
  }

  prepareExcelData(): any[] {
    return this.summaryList.map(item => {
      // Calculate percentages for better readability
      const completePercentage = item.total > 0 ? (item.complete100 / item.total * 100).toFixed(2) : '0.00';
      const above50Percentage = item.total > 0 ? (item.above50 / item.total * 100).toFixed(2) : '0.00';
      const below50Percentage = item.total > 0 ? (item.below50 / item.total * 100).toFixed(2) : '0.00';

      return {
        'District Name': item.name,
        'Type': item.type,
        'Total Cases': item.total,
        '100% Complete': item.complete100,
        '100% Complete %': `${completePercentage}%`,
        'Above 50%': item.above50,
        'Above 50% %': `${above50Percentage}%`,
        'Below 50%': item.below50,
        'Below 50% %': `${below50Percentage}%`,
        // 'Level': item.level
      };
    });
  }

  // Alternative method without percentages
  exportToExcelSimple() {
    if (!this.summaryList || this.summaryList.length === 0) {
      alert('No data available to export');
      return;
    }

    const excelData = this.summaryList.map(item => ({
      'District Name': item.name,
      'Type': item.type,
      'Total Cases': item.total,
      '100% Complete': item.complete100,
      'Above 50%': item.above50,
      'Below 50%': item.below50,
      // 'Level': item.level
    }));

    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.json_to_sheet(excelData);

    XLSX.utils.book_append_sheet(workbook, worksheet, 'District Statistics');

    const fileName = `District_Statistics_${new Date().toISOString().split('T')[0]}.xlsx`;
    XLSX.writeFile(workbook, fileName);
  }

  // Method to export filtered data
  exportFilteredToExcel() {
    if (!this.filteredList || this.filteredList.length === 0) {
      alert('No filtered data available to export');
      return;
    }

    const excelData = this.filteredList.map(item => ({
      'District Name': item.name,
      'Type': item.type,
      'Total Cases': item.total,
      '100% Complete': item.complete100,
      'Above 50%': item.above50,
      'Below 50%': item.below50,
      // 'Level': item.level
    }));

    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.json_to_sheet(excelData);

    XLSX.utils.book_append_sheet(workbook, worksheet, 'Filtered District Statistics');

    const fileName = `Filtered_District_Statistics_${new Date().toISOString().split('T')[0]}.xlsx`;
    XLSX.writeFile(workbook, fileName);
  }
}