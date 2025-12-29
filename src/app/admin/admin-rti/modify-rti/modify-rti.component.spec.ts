import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifyRtiComponent } from './modify-rti.component';

describe('ModifyRtiComponent', () => {
  let component: ModifyRtiComponent;
  let fixture: ComponentFixture<ModifyRtiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModifyRtiComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifyRtiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
