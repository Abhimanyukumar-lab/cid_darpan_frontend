import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FoundPersonComponent } from './found-person.component';

describe('FoundPersonComponent', () => {
  let component: FoundPersonComponent;
  let fixture: ComponentFixture<FoundPersonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FoundPersonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FoundPersonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
