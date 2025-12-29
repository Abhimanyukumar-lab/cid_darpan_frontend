import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifyNcpcrComponent } from './modify-ncpcr.component';

describe('ModifyNcpcrComponent', () => {
  let component: ModifyNcpcrComponent;
  let fixture: ComponentFixture<ModifyNcpcrComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModifyNcpcrComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifyNcpcrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
