import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CharatcerComponent } from './charatcer.component';

describe('CharatcerComponent', () => {
  let component: CharatcerComponent;
  let fixture: ComponentFixture<CharatcerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CharatcerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CharatcerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
