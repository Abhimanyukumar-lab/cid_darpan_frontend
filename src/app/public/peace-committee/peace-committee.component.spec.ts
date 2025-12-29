import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PeaceCommitteeComponent } from './peace-committee.component';

describe('PeaceCommitteeComponent', () => {
  let component: PeaceCommitteeComponent;
  let fixture: ComponentFixture<PeaceCommitteeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PeaceCommitteeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PeaceCommitteeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
