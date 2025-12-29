import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifyAboutDspComponent } from './modify-about-dsp.component';

describe('ModifyAboutDspComponent', () => {
  let component: ModifyAboutDspComponent;
  let fixture: ComponentFixture<ModifyAboutDspComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModifyAboutDspComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifyAboutDspComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
