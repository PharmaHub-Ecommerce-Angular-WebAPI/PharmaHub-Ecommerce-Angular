import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMedicineComponent } from './add-medicine.component';

describe('AddMedicineComponent', () => {
  let component: AddMedicineComponent;
  let fixture: ComponentFixture<AddMedicineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddMedicineComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddMedicineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
