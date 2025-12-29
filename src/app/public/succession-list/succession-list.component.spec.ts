import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuccessionListComponent } from './succession-list.component';

describe('SuccessionListComponent', () => {
  let component: SuccessionListComponent;
  let fixture: ComponentFixture<SuccessionListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SuccessionListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SuccessionListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
