import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginAndRegisterCustomerComponent } from './login-and-register-customer.component';

describe('LoginAndRegisterCustomerComponent', () => {
  let component: LoginAndRegisterCustomerComponent;
  let fixture: ComponentFixture<LoginAndRegisterCustomerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginAndRegisterCustomerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginAndRegisterCustomerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
