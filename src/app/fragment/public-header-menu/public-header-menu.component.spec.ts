import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicHeaderMenuComponent } from './public-header-menu.component';

describe('PublicHeaderMenuComponent', () => {
  let component: PublicHeaderMenuComponent;
  let fixture: ComponentFixture<PublicHeaderMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PublicHeaderMenuComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PublicHeaderMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
