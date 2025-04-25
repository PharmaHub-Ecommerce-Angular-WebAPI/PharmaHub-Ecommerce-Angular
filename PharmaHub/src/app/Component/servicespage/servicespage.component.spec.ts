import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServicespageComponent } from './servicespage.component';

describe('ServicespageComponent', () => {
  let component: ServicespageComponent;
  let fixture: ComponentFixture<ServicespageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ServicespageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ServicespageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
