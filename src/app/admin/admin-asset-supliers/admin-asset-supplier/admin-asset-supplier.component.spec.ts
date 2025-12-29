import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAssetSupplierComponent } from './admin-asset-supplier.component';

describe('AdminAssetSupplierComponent', () => {
  let component: AdminAssetSupplierComponent;
  let fixture: ComponentFixture<AdminAssetSupplierComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminAssetSupplierComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminAssetSupplierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
