import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifyActsComponent } from './modify-acts.component';

describe('ModifyActsComponent', () => {
  let component: ModifyActsComponent;
  let fixture: ComponentFixture<ModifyActsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModifyActsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifyActsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
