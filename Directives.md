# Directives

- A component is internally a directive

## Improve Components

- Strong typing & interfaces
- Encapsulating Styles
- Lifecycle hooks
- Custom Pipes
- Nested Components

## The Trigger Directive

```
import { Directive, OnInit, Inject, ElementRef } from '@angular/core';
import { JQUERY_TOKEN } from 'jQuery.service';

@Directive({
  selector: '[modal-trigger]'
})
export class ModalTriggerDirective implements OnInit {
  @Input('modal-trigger') modalId: string;
  private el: HTMLElement;

  constructor(
    ref: ElementRef,
    @Inject(JQUERY_TOKEN) private $: any
  ) {
    this.el = ref.natvieElement;
  }

  ngOnInit() {
    this.el.addEventListener('click', e => {
     this.$(`#${this.modalId}`).modal({});
    })
  }
}
```
