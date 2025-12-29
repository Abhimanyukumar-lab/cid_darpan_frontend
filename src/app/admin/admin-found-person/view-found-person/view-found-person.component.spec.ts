import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewFoundPersonComponent } from './view-found-person.component';

describe('ViewFoundPersonComponent', () => {
  let component: ViewFoundPersonComponent;
  let fixture: ComponentFixture<ViewFoundPersonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewFoundPersonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewFoundPersonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
