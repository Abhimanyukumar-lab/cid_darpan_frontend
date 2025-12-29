import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResourceTrasnferComponent } from './resource-trasnfer.component';

describe('ResourceTrasnferComponent', () => {
  let component: ResourceTrasnferComponent;
  let fixture: ComponentFixture<ResourceTrasnferComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResourceTrasnferComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResourceTrasnferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
