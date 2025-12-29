import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAssetSupplierViewComponent } from './admin-asset-supplier-view.component';

describe('AdminAssetSupplierViewComponent', () => {
  let component: AdminAssetSupplierViewComponent;
  let fixture: ComponentFixture<AdminAssetSupplierViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminAssetSupplierViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminAssetSupplierViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
