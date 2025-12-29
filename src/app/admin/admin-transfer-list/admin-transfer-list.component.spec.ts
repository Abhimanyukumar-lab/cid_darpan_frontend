import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminTransferListComponent } from './admin-transfer-list.component';

describe('AdminTransferListComponent', () => {
  let component: AdminTransferListComponent;
  let fixture: ComponentFixture<AdminTransferListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminTransferListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminTransferListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
