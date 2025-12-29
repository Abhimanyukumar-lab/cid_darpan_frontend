import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifyNwrcComponent } from './modify-nwrc.component';

describe('ModifyNwrcComponent', () => {
  let component: ModifyNwrcComponent;
  let fixture: ComponentFixture<ModifyNwrcComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModifyNwrcComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifyNwrcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
