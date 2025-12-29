import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcecutionDetailsTableComponent } from './procecution-details-table.component';

describe('ProcecutionDetailsTableComponent', () => {
  let component: ProcecutionDetailsTableComponent;
  let fixture: ComponentFixture<ProcecutionDetailsTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProcecutionDetailsTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProcecutionDetailsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
