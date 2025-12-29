import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewEcommReceiptComponent } from './view-ecomm-receipt.component';

describe('ViewEcommReceiptComponent', () => {
  let component: ViewEcommReceiptComponent;
  let fixture: ComponentFixture<ViewEcommReceiptComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewEcommReceiptComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewEcommReceiptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
