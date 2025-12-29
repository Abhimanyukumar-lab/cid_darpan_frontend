import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicModelComponent } from './public-model.component';

describe('PublicModelComponent', () => {
  let component: PublicModelComponent;
  let fixture: ComponentFixture<PublicModelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PublicModelComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PublicModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
