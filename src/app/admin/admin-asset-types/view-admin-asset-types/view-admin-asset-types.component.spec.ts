import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewAdminAssetTypesComponent } from './view-admin-asset-types.component';

describe('ViewAdminAssetTypesComponent', () => {
  let component: ViewAdminAssetTypesComponent;
  let fixture: ComponentFixture<ViewAdminAssetTypesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewAdminAssetTypesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewAdminAssetTypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
