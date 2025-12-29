import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifyBannerComponent } from './modify-banner.component';

describe('ModifyBannerComponent', () => {
  let component: ModifyBannerComponent;
  let fixture: ComponentFixture<ModifyBannerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModifyBannerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifyBannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
