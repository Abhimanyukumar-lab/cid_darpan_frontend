import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewPassportComponent } from './view-passport.component';

describe('ViewPassportComponent', () => {
  let component: ViewPassportComponent;
  let fixture: ComponentFixture<ViewPassportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewPassportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewPassportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
