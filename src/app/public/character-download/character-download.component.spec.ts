import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CharacterDownloadComponent } from './character-download.component';

describe('CharacterDownloadComponent', () => {
  let component: CharacterDownloadComponent;
  let fixture: ComponentFixture<CharacterDownloadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CharacterDownloadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CharacterDownloadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
