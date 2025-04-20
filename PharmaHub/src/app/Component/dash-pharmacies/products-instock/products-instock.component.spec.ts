import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsInstockComponent } from './products-instock.component';

describe('ProductsInstockComponent', () => {
  let component: ProductsInstockComponent;
  let fixture: ComponentFixture<ProductsInstockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductsInstockComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductsInstockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
