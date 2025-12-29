import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PoliceDiaryComponent } from './police-diary.component';

describe('PoliceDiaryComponent', () => {
  let component: PoliceDiaryComponent;
  let fixture: ComponentFixture<PoliceDiaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PoliceDiaryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PoliceDiaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
