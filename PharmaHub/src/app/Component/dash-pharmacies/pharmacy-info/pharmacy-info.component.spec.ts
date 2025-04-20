import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PharmacyInfoComponent } from './pharmacy-info.component';

describe('PharmacyInfoComponent', () => {
  let component: PharmacyInfoComponent;
  let fixture: ComponentFixture<PharmacyInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PharmacyInfoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PharmacyInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
