import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicHeadlineComponent } from './public-headline.component';

describe('PublicHeadlineComponent', () => {
  let component: PublicHeadlineComponent;
  let fixture: ComponentFixture<PublicHeadlineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PublicHeadlineComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PublicHeadlineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
