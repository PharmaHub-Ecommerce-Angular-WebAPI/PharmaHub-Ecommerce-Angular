import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfilePackagesComponent } from './profile-packages.component';

describe('ProfilePackagesComponent', () => {
  let component: ProfilePackagesComponent;
  let fixture: ComponentFixture<ProfilePackagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfilePackagesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfilePackagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
