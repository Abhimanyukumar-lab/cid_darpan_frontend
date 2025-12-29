import { Component, OnInit } from '@angular/core';
import { ApiCallerService } from 'src/app/services/api-caller.service';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-district-statistics-report',
  templateUrl: './district-statistics-report.component.html',
  styleUrls: ['./district-statistics-report.component.scss']
})
export class DistrictStatisticsReportComponent implements OnInit {
  districts: any[] = [];
  isLoading: boolean = true;
  errorMessage: string = '';
  
  totalCases: number = 0;
  totalSRCases: number = 0;
  totalNSRCases: number = 0;

  constructor(private apiCaller: ApiCallerService) {}

  ngOnInit(): void {
    this.loadDistrictData();
  }

  loadDistrictData(): void {
    this.isLoading = true;
    this.errorMessage = '';

    this.apiCaller.apiGetCall('getCaseDetails', true).subscribe({
      next: (response) => {
        try {
          if (response && response.data && response.data.districtsDetails) {
            this.districts = response.data.districtsDetails;
            this.totalCases = response.data.totalCases || 0;
            this.totalSRCases = response.data.totalSrCases || 0;
            this.totalNSRCases = response.data.totalNsrCases || 0;
            
           // console.log('Processed Districts:', this.districts);
          } else {
            throw new Error('Invalid response structure');
          }
        } catch (error) {
          console.error('Data processing error:', error);
          this.errorMessage = 'Invalid data format received from server';
        }
        this.isLoading = false;
      },
      error: (err) => {
        console.error('API Error:', err);
        this.errorMessage = 'Failed to load district data: ' + (err.message || 'Server error');
        this.isLoading = false;
      }
    });
  }

  exportToExcel(): void {
    const exportData = [
      ...this.districts.map(district => ({
        'District Name': district.name,
        'SR Cases': district.totalSrCases,
        'NSR Cases': district.totalNsrCases,
        'Total Cases': district.totalCases
      })),
      {
        'District Name': 'TOTAL',
        'SR Cases': this.totalSRCases,
        'NSR Cases': this.totalNSRCases,
        'Total Cases': this.totalCases
      }
    ];

    const worksheet = XLSX.utils.json_to_sheet(exportData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'District Statistics');
    
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    XLSX.writeFile(workbook, `District_Stats_${timestamp}.xlsx`);
  }


 exportToPDF(): void {
  this.isLoading = true;
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const filename = `District_Stats_${timestamp}.pdf`;

  // Create a temporary container for PDF content
  const pdfContent = document.getElementById('pdf-content');
  
  if (!pdfContent) {
    console.error('PDF content element not found');
    this.isLoading = false;
    return;
  }

  // Clone the element to avoid modifying the original
  const element = pdfContent.cloneNode(true) as HTMLElement;
  document.body.appendChild(element);
  element.style.position = 'absolute';
  element.style.left = '-9999px';
  element.style.width = '190mm'; // Set a fixed width for A4

  // Add custom styling for PDF
  element.style.padding = '20px';
  element.style.fontSize = '12pt';

  const options = {
    scale: 2,
    useCORS: true,
    allowTaint: true,
    logging: true,
    width: element.scrollWidth,
    height: element.scrollHeight,
    scrollX: 0,
    scrollY: 0,
    windowWidth: element.scrollWidth,
    windowHeight: element.scrollHeight
  };

  html2canvas(element, options).then((canvas) => {
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF('p', 'mm', 'a4');
    const imgWidth = 190; // Reduced width for margins
    const imgHeight = canvas.height * imgWidth / canvas.width;
    
    // Add main image
    pdf.addImage(imgData, 'PNG', 10, 10, imgWidth, imgHeight);

    // Remove the temporary element
    document.body.removeChild(element);

    pdf.save(filename);
    this.isLoading = false;
  }).catch((error) => {
    console.error('Error generating PDF:', error);
    document.body.removeChild(element);
    this.isLoading = false;
  });
}


  refreshData(): void {
    this.loadDistrictData();
  }
}