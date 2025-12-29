import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifySuccessionListComponent } from './modify-succession-list.component';

describe('ModifySuccessionListComponent', () => {
  let component: ModifySuccessionListComponent;
  let fixture: ComponentFixture<ModifySuccessionListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModifySuccessionListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifySuccessionListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
