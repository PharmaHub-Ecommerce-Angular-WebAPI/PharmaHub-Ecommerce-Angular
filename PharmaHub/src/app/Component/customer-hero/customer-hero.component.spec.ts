import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerHeroComponent } from './customer-hero.component';

describe('CustomerHeroComponent', () => {
  let component: CustomerHeroComponent;
  let fixture: ComponentFixture<CustomerHeroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomerHeroComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomerHeroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
