import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewSdpoComponent } from './view-sdpo.component';

describe('ViewSdpoComponent', () => {
  let component: ViewSdpoComponent;
  let fixture: ComponentFixture<ViewSdpoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewSdpoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewSdpoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
