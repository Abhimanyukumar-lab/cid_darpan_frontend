import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifyNscstComponent } from './modify-nscst.component';

describe('ModifyNscstComponent', () => {
  let component: ModifyNscstComponent;
  let fixture: ComponentFixture<ModifyNscstComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModifyNscstComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifyNscstComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
