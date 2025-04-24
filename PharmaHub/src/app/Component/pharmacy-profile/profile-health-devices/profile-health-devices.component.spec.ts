import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileHealthDevicesComponent } from './profile-health-devices.component';

describe('ProfileHealthDevicesComponent', () => {
  let component: ProfileHealthDevicesComponent;
  let fixture: ComponentFixture<ProfileHealthDevicesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfileHealthDevicesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfileHealthDevicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
