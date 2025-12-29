import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewNcpcrComponent } from './view-ncpcr.component';

describe('ViewNcpcrComponent', () => {
  let component: ViewNcpcrComponent;
  let fixture: ComponentFixture<ViewNcpcrComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewNcpcrComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewNcpcrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
