import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PackageHeadingComponent } from './package-heading.component';

describe('PackageHeadingComponent', () => {
  let component: PackageHeadingComponent;
  let fixture: ComponentFixture<PackageHeadingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PackageHeadingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PackageHeadingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
