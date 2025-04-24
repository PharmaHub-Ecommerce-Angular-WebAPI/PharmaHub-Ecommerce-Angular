import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfilePersonalCareComponent } from './profile-personal-care.component';

describe('ProfilePersonalCareComponent', () => {
  let component: ProfilePersonalCareComponent;
  let fixture: ComponentFixture<ProfilePersonalCareComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfilePersonalCareComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfilePersonalCareComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
