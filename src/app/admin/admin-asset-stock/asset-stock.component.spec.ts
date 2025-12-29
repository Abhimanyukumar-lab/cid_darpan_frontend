import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssetStockComponent } from './asset-stock.component';

describe('AssetStockComponent', () => {
  let component: AssetStockComponent;
  let fixture: ComponentFixture<AssetStockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssetStockComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AssetStockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
