import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifySmsTemplateComponent } from './modify-sms-template.component';

describe('ModifySmsTemplateComponent', () => {
  let component: ModifySmsTemplateComponent;
  let fixture: ComponentFixture<ModifySmsTemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModifySmsTemplateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifySmsTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
