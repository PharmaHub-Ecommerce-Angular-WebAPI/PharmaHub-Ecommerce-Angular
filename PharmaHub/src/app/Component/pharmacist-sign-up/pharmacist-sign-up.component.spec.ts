import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PharmacistSignUpComponent } from './pharmacist-sign-up.component';

describe('PharmacistSignUpComponent', () => {
  let component: PharmacistSignUpComponent;
  let fixture: ComponentFixture<PharmacistSignUpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PharmacistSignUpComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PharmacistSignUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
