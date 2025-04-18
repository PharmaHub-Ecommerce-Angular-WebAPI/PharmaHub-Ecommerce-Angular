import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FillterPriceComponent } from './fillter-price.component';

describe('FillterPriceComponent', () => {
  let component: FillterPriceComponent;
  let fixture: ComponentFixture<FillterPriceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FillterPriceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FillterPriceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
