import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddHealthDeviceComponent } from './add-health-device.component';

describe('AddHealthDeviceComponent', () => {
  let component: AddHealthDeviceComponent;
  let fixture: ComponentFixture<AddHealthDeviceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddHealthDeviceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddHealthDeviceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
