import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SdpoComponent } from './sdpo.component';

describe('SdpoComponent', () => {
  let component: SdpoComponent;
  let fixture: ComponentFixture<SdpoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SdpoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SdpoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
