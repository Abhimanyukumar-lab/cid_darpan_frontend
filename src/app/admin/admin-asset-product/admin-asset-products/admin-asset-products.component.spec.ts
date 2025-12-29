import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAssetProductsComponent } from './admin-asset-products.component';

describe('AdminAssetProductsComponent', () => {
  let component: AdminAssetProductsComponent;
  let fixture: ComponentFixture<AdminAssetProductsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminAssetProductsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminAssetProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
