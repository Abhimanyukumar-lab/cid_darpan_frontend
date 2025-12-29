import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifyCourtHighComponent } from './modify-court-high.component';

describe('ModifyCourtHighComponent', () => {
  let component: ModifyCourtHighComponent;
  let fixture: ComponentFixture<ModifyCourtHighComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModifyCourtHighComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifyCourtHighComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
