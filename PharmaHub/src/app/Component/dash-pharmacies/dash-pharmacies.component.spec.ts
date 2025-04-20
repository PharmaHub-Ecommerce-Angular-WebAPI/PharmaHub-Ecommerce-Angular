import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashPharmaciesComponent } from './dash-pharmacies.component';

describe('DashPharmaciesComponent', () => {
  let component: DashPharmaciesComponent;
  let fixture: ComponentFixture<DashPharmaciesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashPharmaciesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashPharmaciesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
