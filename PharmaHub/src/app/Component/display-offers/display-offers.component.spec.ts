import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayOffersComponent } from './display-offers.component';

describe('DisplayOffersComponent', () => {
  let component: DisplayOffersComponent;
  let fixture: ComponentFixture<DisplayOffersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DisplayOffersComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DisplayOffersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
