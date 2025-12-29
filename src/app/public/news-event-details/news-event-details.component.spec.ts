import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewsEventDetailsComponent } from './news-event-details.component';

describe('NewsEventDetailsComponent', () => {
  let component: NewsEventDetailsComponent;
  let fixture: ComponentFixture<NewsEventDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewsEventDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewsEventDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
