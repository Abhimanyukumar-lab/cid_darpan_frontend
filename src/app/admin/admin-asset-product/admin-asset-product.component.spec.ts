import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAssetProductComponent } from './admin-asset-product.component';

describe('AdminAssetProductComponent', () => {
  let component: AdminAssetProductComponent;
  let fixture: ComponentFixture<AdminAssetProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminAssetProductComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminAssetProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
