import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StationUserComponent } from './station-user.component';

describe('StationUserComponent', () => {
  let component: StationUserComponent;
  let fixture: ComponentFixture<StationUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StationUserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StationUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
