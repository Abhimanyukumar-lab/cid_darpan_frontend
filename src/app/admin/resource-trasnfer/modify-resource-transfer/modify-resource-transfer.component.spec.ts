import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifyResourceTransferComponent } from './modify-resource-transfer.component';

describe('ModifyResourceTransferComponent', () => {
  let component: ModifyResourceTransferComponent;
  let fixture: ComponentFixture<ModifyResourceTransferComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModifyResourceTransferComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifyResourceTransferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
