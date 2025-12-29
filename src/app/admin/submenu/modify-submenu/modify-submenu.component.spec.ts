import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifySubmenuComponent } from './modify-submenu.component';

describe('ModifySubmenuComponent', () => {
  let component: ModifySubmenuComponent;
  let fixture: ComponentFixture<ModifySubmenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModifySubmenuComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifySubmenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
