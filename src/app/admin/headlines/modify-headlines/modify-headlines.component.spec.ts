import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifyHeadlinesComponent } from './modify-headlines.component';

describe('ModifyHeadlinesComponent', () => {
  let component: ModifyHeadlinesComponent;
  let fixture: ComponentFixture<ModifyHeadlinesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModifyHeadlinesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifyHeadlinesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
