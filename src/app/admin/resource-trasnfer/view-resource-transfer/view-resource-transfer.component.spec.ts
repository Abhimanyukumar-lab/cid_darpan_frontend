import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewResourceTransferComponent } from './view-resource-transfer.component';

describe('ViewResourceTransferComponent', () => {
  let component: ViewResourceTransferComponent;
  let fixture: ComponentFixture<ViewResourceTransferComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewResourceTransferComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewResourceTransferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
