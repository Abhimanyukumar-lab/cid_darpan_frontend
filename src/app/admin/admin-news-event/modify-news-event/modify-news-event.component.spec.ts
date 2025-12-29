import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifyNewsEventComponent } from './modify-news-event.component';

describe('ModifyNewsEventComponent', () => {
  let component: ModifyNewsEventComponent;
  let fixture: ComponentFixture<ModifyNewsEventComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModifyNewsEventComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifyNewsEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
