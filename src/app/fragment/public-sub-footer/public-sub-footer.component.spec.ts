import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicSubFooterComponent } from './public-sub-footer.component';

describe('PublicSubFooterComponent', () => {
  let component: PublicSubFooterComponent;
  let fixture: ComponentFixture<PublicSubFooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PublicSubFooterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PublicSubFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
