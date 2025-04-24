import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileMedicinesComponent } from './profile-medicines.component';

describe('ProfileMedicinesComponent', () => {
  let component: ProfileMedicinesComponent;
  let fixture: ComponentFixture<ProfileMedicinesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfileMedicinesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfileMedicinesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
