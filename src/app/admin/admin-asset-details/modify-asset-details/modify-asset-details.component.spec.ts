import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifyAssetDetailsComponent } from './modify-asset-details.component';

describe('ModifyAssetDetailsComponent', () => {
  let component: ModifyAssetDetailsComponent;
  let fixture: ComponentFixture<ModifyAssetDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModifyAssetDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifyAssetDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
