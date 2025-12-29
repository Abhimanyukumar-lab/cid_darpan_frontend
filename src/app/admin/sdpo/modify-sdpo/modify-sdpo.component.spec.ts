import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifySdpoComponent } from './modify-sdpo.component';

describe('ModifySdpoComponent', () => {
  let component: ModifySdpoComponent;
  let fixture: ComponentFixture<ModifySdpoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModifySdpoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifySdpoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
