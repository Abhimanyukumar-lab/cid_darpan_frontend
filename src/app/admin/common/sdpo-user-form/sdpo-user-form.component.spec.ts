import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SdpoUserFormComponent } from './sdpo-user-form.component';

describe('SdpoUserFormComponent', () => {
  let component: SdpoUserFormComponent;
  let fixture: ComponentFixture<SdpoUserFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SdpoUserFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SdpoUserFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
