import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WarrentComponent } from './warrent.component';

describe('WarrentComponent', () => {
  let component: WarrentComponent;
  let fixture: ComponentFixture<WarrentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WarrentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WarrentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
