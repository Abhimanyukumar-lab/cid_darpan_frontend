import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAssetProductsViewComponent } from './admin-asset-products-view.component';

describe('AdminAssetProductsViewComponent', () => {
  let component: AdminAssetProductsViewComponent;
  let fixture: ComponentFixture<AdminAssetProductsViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminAssetProductsViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminAssetProductsViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
