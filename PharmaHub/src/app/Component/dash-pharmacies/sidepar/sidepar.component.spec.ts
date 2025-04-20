import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SideparComponent } from './sidepar.component';

describe('SideparComponent', () => {
  let component: SideparComponent;
  let fixture: ComponentFixture<SideparComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SideparComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SideparComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
