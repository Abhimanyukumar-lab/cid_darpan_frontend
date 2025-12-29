import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifyPressReleaseComponent } from './modify-press-release.component';

describe('ModifyPressReleaseComponent', () => {
  let component: ModifyPressReleaseComponent;
  let fixture: ComponentFixture<ModifyPressReleaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModifyPressReleaseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifyPressReleaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
