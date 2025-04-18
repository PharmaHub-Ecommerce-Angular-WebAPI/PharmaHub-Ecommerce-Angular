import { Directive, ElementRef, Renderer2, OnInit } from '@angular/core';

@Directive({
  selector: '[appMoveUpAnimate]',
})
export class MoveUpAnimateDirective implements OnInit {
  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngOnInit(): void {
    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            this.renderer.addClass(this.el.nativeElement, 'active');
            obs.unobserve(entry.target); // Only reveal once
          }
        });
      },
      {
        threshold: 0.3,
      }
    );

    this.renderer.addClass(this.el.nativeElement, 'reveal'); // Initial state
    observer.observe(this.el.nativeElement);
  }
}
