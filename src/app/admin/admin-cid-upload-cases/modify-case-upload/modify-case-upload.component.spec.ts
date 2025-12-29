import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifyCaseUploadComponent } from './modify-case-upload.component';

describe('ModifyCaseUploadComponent', () => {
  let component: ModifyCaseUploadComponent;
  let fixture: ComponentFixture<ModifyCaseUploadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModifyCaseUploadComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModifyCaseUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
