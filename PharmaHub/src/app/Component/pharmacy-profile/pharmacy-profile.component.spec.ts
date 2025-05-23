import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PharmacyProfileComponent } from './pharmacy-profile.component';

describe('PharmacyProfileComponent', () => {
  let component: PharmacyProfileComponent;
  let fixture: ComponentFixture<PharmacyProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PharmacyProfileComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PharmacyProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
