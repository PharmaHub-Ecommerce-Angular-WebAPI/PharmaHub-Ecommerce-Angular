import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FooterMarqueeComponent } from './footer-marquee.component';

describe('FooterMarqueeComponent', () => {
  let component: FooterMarqueeComponent;
  let fixture: ComponentFixture<FooterMarqueeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FooterMarqueeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FooterMarqueeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
