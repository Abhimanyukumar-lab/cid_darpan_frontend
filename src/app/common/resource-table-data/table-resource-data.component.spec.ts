import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableResourceDataComponent } from './table-resource-data.component';

describe('TableDataComponent', () => {
  let component: TableResourceDataComponent;
  let fixture: ComponentFixture<TableResourceDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TableResourceDataComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TableResourceDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
