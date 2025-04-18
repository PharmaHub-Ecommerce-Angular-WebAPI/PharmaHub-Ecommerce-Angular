import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PharmaciesEntryComponent } from './pharmacies-entry.component';

describe('PharmaciesEntryComponent', () => {
  let component: PharmaciesEntryComponent;
  let fixture: ComponentFixture<PharmaciesEntryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PharmaciesEntryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PharmaciesEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
