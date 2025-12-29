import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicModelComponent } from './public-model.component';

describe('ModelComponent', () => {
  let component: PublicModelComponent;
  let fixture: ComponentFixture<PublicModelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PublicModelComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PublicModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
