import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddBeautyProductComponent } from './add-beauty-product.component';

describe('AddBeautyProductComponent', () => {
  let component: AddBeautyProductComponent;
  let fixture: ComponentFixture<AddBeautyProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddBeautyProductComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddBeautyProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
