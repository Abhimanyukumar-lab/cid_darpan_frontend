import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifyAssetTypeComponent } from './modify-asset-type.component';

describe('ModifyAssetTypeComponent', () => {
  let component: ModifyAssetTypeComponent;
  let fixture: ComponentFixture<ModifyAssetTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModifyAssetTypeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifyAssetTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
