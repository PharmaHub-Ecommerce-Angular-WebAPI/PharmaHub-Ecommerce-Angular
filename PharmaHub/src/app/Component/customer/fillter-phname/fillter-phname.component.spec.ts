import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FillterPHnameComponent } from './fillter-phname.component';

describe('FillterPHnameComponent', () => {
  let component: FillterPHnameComponent;
  let fixture: ComponentFixture<FillterPHnameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FillterPHnameComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FillterPHnameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
