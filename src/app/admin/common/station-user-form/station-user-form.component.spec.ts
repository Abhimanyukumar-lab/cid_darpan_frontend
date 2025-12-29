import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StationUserFormComponent } from './station-user-form.component';

describe('StationUserFormComponent', () => {
  let component: StationUserFormComponent;
  let fixture: ComponentFixture<StationUserFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StationUserFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StationUserFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
