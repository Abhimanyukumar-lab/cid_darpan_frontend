import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifyCriminalListComponent } from './modify-criminal-list.component';

describe('ModifyCriminalListComponent', () => {
  let component: ModifyCriminalListComponent;
  let fixture: ComponentFixture<ModifyCriminalListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModifyCriminalListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifyCriminalListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
