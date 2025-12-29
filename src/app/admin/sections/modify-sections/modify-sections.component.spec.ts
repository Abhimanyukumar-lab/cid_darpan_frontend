import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifySectionsComponent } from './modify-sections.component';

describe('ModifySectionsComponent', () => {
  let component: ModifySectionsComponent;
  let fixture: ComponentFixture<ModifySectionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModifySectionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifySectionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
