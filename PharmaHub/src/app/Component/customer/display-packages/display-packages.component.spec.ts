import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayPackagesComponent } from './display-packages.component';

describe('DisplayPackagesComponent', () => {
  let component: DisplayPackagesComponent;
  let fixture: ComponentFixture<DisplayPackagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DisplayPackagesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DisplayPackagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
