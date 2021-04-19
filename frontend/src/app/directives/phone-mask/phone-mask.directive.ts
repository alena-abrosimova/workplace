import { Directive, ElementRef, OnDestroy } from '@angular/core';
import * as textMask from 'vanilla-text-mask/dist/vanillaTextMask.js';


@Directive({
  selector: '[phoneMask]'
})

export class PhoneMaskDirective implements OnDestroy {
  phoneMask = ['+', '7', '(', /\d/, /\d/, /\d/, ')', /\d/, /\d/, /\d/, '-', /\d/, /\d/, '-', /\d/, /\d/];

  maskInputController;

  constructor(private element: ElementRef) {
    this.maskInputController = textMask.maskInput({
      inputElement: this.element.nativeElement,
      mask: this.phoneMask,
      guide: false
    });
  }

  ngOnDestroy(): void {
    this.maskInputController.destroy();
  }
}
