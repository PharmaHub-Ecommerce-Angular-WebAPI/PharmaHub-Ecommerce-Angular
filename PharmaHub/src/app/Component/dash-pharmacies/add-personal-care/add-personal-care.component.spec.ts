import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPersonalCareComponent } from './add-personal-care.component';

describe('AddPersonalCareComponent', () => {
  let component: AddPersonalCareComponent;
  let fixture: ComponentFixture<AddPersonalCareComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddPersonalCareComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddPersonalCareComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
