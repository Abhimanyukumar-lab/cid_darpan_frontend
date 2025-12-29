import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAssetSupliersComponent } from './admin-asset-supliers.component';

describe('AdminAssetSupliersComponent', () => {
  let component: AdminAssetSupliersComponent;
  let fixture: ComponentFixture<AdminAssetSupliersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminAssetSupliersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminAssetSupliersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
