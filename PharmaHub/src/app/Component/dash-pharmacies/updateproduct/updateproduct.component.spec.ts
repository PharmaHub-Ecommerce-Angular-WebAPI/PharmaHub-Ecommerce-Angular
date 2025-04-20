import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateproductComponent } from './updateproduct.component';

describe('UpdateproductComponent', () => {
  let component: UpdateproductComponent;
  let fixture: ComponentFixture<UpdateproductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateproductComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateproductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
