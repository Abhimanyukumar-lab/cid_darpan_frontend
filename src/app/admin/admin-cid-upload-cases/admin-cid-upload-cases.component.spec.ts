import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminCidUploadCasesComponent } from './admin-cid-upload-cases.component';

describe('AdminCidUploadCasesComponent', () => {
  let component: AdminCidUploadCasesComponent;
  let fixture: ComponentFixture<AdminCidUploadCasesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminCidUploadCasesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminCidUploadCasesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
