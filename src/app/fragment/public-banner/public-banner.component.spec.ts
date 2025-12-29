import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicBannerComponent } from './public-banner.component';

describe('PublicBannerComponent', () => {
  let component: PublicBannerComponent;
  let fixture: ComponentFixture<PublicBannerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PublicBannerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PublicBannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
