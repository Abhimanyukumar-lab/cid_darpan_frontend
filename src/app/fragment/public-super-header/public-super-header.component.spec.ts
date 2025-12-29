import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicSuperHeaderComponent } from './public-super-header.component';

describe('PublicSuperHeaderComponent', () => {
  let component: PublicSuperHeaderComponent;
  let fixture: ComponentFixture<PublicSuperHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PublicSuperHeaderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PublicSuperHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
