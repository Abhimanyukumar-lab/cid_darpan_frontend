import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifyLinksComponent } from './modify-links.component';

describe('ModifyLinksComponent', () => {
  let component: ModifyLinksComponent;
  let fixture: ComponentFixture<ModifyLinksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModifyLinksComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifyLinksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
