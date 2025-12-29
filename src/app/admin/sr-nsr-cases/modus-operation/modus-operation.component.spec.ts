import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModusOperationComponent } from './modus-operation.component';

describe('ModusOperationComponent', () => {
  let component: ModusOperationComponent;
  let fixture: ComponentFixture<ModusOperationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModusOperationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModusOperationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
