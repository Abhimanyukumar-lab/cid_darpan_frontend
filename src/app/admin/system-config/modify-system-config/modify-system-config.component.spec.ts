import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifySystemConfigComponent } from './modify-system-config.component';

describe('ModifySystemConfigComponent', () => {
  let component: ModifySystemConfigComponent;
  let fixture: ComponentFixture<ModifySystemConfigComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModifySystemConfigComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifySystemConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
