import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewCidUploadComponent } from './view-cid-upload.component';

describe('ViewCidUploadComponent', () => {
  let component: ViewCidUploadComponent;
  let fixture: ComponentFixture<ViewCidUploadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewCidUploadComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewCidUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
