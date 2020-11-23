import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appHighlight]',
})
export class HighlightDirective {
  constructor(el: ElementRef) {
    const style = el.nativeElement.style;
    
    style.color = 'rgb(105, 240, 174)';
    style.fontStyle = 'italic';
  }
}
