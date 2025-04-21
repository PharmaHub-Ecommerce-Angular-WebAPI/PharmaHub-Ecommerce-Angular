import { Directive, ElementRef, Renderer2, OnInit, Input } from '@angular/core';

@Directive({
  selector: '[appMoveAnimateleftorright]',
})
export class MoveAnimateDirective implements OnInit {
  @Input() direction: 'left' | 'right' = 'right';

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
      { threshold: 0.3 }
    );

    const baseClass = this.direction === 'left' ? 'fade-left' : 'fade-right';
    this.renderer.addClass(this.el.nativeElement, baseClass);
    observer.observe(this.el.nativeElement);
  }
}
