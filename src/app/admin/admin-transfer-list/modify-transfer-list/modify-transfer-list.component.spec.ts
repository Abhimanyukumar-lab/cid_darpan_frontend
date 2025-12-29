import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifyTransferListComponent } from './modify-transfer-list.component';

describe('ModifyTransferListComponent', () => {
  let component: ModifyTransferListComponent;
  let fixture: ComponentFixture<ModifyTransferListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModifyTransferListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifyTransferListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
