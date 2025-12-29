import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminEcommReceiptComponent } from './admin-ecomm-receipt.component';

describe('AdminEcommReceiptComponent', () => {
  let component: AdminEcommReceiptComponent;
  let fixture: ComponentFixture<AdminEcommReceiptComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminEcommReceiptComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminEcommReceiptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
