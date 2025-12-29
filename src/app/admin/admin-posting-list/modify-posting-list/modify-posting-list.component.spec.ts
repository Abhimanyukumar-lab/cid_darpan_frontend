import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifyPostingListComponent } from './modify-posting-list.component';

describe('ModifyPostingListComponent', () => {
  let component: ModifyPostingListComponent;
  let fixture: ComponentFixture<ModifyPostingListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModifyPostingListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifyPostingListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
