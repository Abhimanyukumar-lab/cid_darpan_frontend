import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAssetDetailsComponent } from './admin-asset-details.component';

describe('AdminAssetDetailsComponent', () => {
  let component: AdminAssetDetailsComponent;
  let fixture: ComponentFixture<AdminAssetDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminAssetDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminAssetDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
