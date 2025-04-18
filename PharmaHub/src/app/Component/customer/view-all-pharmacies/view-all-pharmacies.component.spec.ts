import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewAllPharmaciesComponent } from './view-all-pharmacies.component';

describe('ViewAllPharmaciesComponent', () => {
  let component: ViewAllPharmaciesComponent;
  let fixture: ComponentFixture<ViewAllPharmaciesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewAllPharmaciesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewAllPharmaciesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
