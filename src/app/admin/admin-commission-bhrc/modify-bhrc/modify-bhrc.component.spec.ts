import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifyBhrcComponent } from './modify-bhrc.component';

describe('ModifyBhrcComponent', () => {
  let component: ModifyBhrcComponent;
  let fixture: ComponentFixture<ModifyBhrcComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModifyBhrcComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifyBhrcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
