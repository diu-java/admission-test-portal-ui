import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmissionMarkEntryComponent } from './admission-mark-entry.component';

describe('AdmissionMarkEntryComponent', () => {
  let component: AdmissionMarkEntryComponent;
  let fixture: ComponentFixture<AdmissionMarkEntryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdmissionMarkEntryComponent]
    });
    fixture = TestBed.createComponent(AdmissionMarkEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
