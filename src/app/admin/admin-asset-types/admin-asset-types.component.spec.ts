import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAssetTypesComponent } from './admin-asset-types.component';

describe('AdminAssetTypesComponent', () => {
  let component: AdminAssetTypesComponent;
  let fixture: ComponentFixture<AdminAssetTypesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminAssetTypesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminAssetTypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
