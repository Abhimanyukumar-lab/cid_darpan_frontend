import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoGarrelyComponent } from './video-garrely.component';

describe('VideoGarrelyComponent', () => {
  let component: VideoGarrelyComponent;
  let fixture: ComponentFixture<VideoGarrelyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VideoGarrelyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VideoGarrelyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
