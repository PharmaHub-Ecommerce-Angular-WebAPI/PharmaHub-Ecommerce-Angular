import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileBeautyProductComponent } from './profile-beauty-product.component';

describe('ProfileBeautyProductComponent', () => {
  let component: ProfileBeautyProductComponent;
  let fixture: ComponentFixture<ProfileBeautyProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfileBeautyProductComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfileBeautyProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
