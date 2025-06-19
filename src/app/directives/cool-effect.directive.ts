import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appCoolEffect]'
})
export class CoolEffectDirective {

 constructor(private el: ElementRef, private renderer: Renderer2) {}

  @HostListener('mouseenter') onMouseEnter() {
    // מגדיל את האלמנט ומוסיף הצללה
    this.renderer.setStyle(this.el.nativeElement, 'transform', 'scale(1.05)');
    this.renderer.setStyle(this.el.nativeElement, 'transition', 'transform 0.3s ease');
    this.renderer.setStyle(this.el.nativeElement, 'box-shadow', '0 4px 8px rgba(0,0,0,0.3)');
  }

  @HostListener('mouseleave') onMouseLeave() {
    // מסיר את השינויים
    this.renderer.removeStyle(this.el.nativeElement, 'transform');
    this.renderer.removeStyle(this.el.nativeElement, 'box-shadow');
}
}
