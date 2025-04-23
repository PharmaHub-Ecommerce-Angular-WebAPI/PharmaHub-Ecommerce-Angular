import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPakageComponent } from './add-pakage.component';

describe('AddPakageComponent', () => {
  let component: AddPakageComponent;
  let fixture: ComponentFixture<AddPakageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddPakageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddPakageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
