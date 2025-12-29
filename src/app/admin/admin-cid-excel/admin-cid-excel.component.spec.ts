import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminCidExcelComponent } from './admin-cid-excel.component';

describe('AdminCidExcelComponent', () => {
  let component: AdminCidExcelComponent;
  let fixture: ComponentFixture<AdminCidExcelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminCidExcelComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminCidExcelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
