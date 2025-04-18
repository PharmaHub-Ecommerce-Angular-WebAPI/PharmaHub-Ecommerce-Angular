import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllOffersComponent } from './all-offers.component';

describe('AllOffersComponent', () => {
  let component: AllOffersComponent;
  let fixture: ComponentFixture<AllOffersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AllOffersComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllOffersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
