import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuppliersProductsTableComponent } from './suppliers-products-table.component';

describe('SuppliersProductsTableComponent', () => {
  let component: SuppliersProductsTableComponent;
  let fixture: ComponentFixture<SuppliersProductsTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SuppliersProductsTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SuppliersProductsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
