import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifyCourtSupremeComponent } from './modify-court-supreme.component';

describe('ModifyCourtSupremeComponent', () => {
  let component: ModifyCourtSupremeComponent;
  let fixture: ComponentFixture<ModifyCourtSupremeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModifyCourtSupremeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifyCourtSupremeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
