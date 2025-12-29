import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifyEcommReceiptComponent } from './modify-ecomm-receipt.component';

describe('ModifyEcommReceiptComponent', () => {
  let component: ModifyEcommReceiptComponent;
  let fixture: ComponentFixture<ModifyEcommReceiptComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModifyEcommReceiptComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifyEcommReceiptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
