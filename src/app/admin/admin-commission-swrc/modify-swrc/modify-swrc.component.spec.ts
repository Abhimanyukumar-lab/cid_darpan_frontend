import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifySwrcComponent } from './modify-swrc.component';

describe('ModifySwrcComponent', () => {
  let component: ModifySwrcComponent;
  let fixture: ComponentFixture<ModifySwrcComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModifySwrcComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifySwrcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
