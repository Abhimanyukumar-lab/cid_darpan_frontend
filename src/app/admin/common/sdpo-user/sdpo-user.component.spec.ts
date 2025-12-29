import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SdpoUserComponent } from './sdpo-user.component';

describe('SdpoUserComponent', () => {
  let component: SdpoUserComponent;
  let fixture: ComponentFixture<SdpoUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SdpoUserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SdpoUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
