import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifyNHRCComponent } from './modify-nhrc.component';

describe('ModifyNHRCComponent', () => {
  let component: ModifyNHRCComponent;
  let fixture: ComponentFixture<ModifyNHRCComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModifyNHRCComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifyNHRCComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
