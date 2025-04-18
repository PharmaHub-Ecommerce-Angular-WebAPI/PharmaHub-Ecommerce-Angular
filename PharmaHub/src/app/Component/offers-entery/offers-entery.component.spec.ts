import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OffersEnteryComponent } from './offers-entery.component';

describe('OffersEnteryComponent', () => {
  let component: OffersEnteryComponent;
  let fixture: ComponentFixture<OffersEnteryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OffersEnteryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OffersEnteryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
