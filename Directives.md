# Directives

- A component is internally a directive

## Components

- Components are core building blocks of an Angular application
- @Input() decorator - way to get data into our components
- @Ouput() decorator - way to broadcast out notification and emit data out of our components

```
name
=>
firstName, lastName
=>
userName.first, username.last

@Component({
  selector: 'rbn-user',
  template: `{{ firstName }} {{ lastName }}`
})
export class UserComponent {
  @Input() firstName;
  @Input() lastName;
}

export interface Login {
  username: string;
  password: string;
}
export interface LoginDisplay extends Login {
  usernameIsEmail: boolean;
}

@Input() login: LoginDisplay;
```

### @Output

- Emit copy of the data not reference.

```
@Output() selected = new EventEmitter<Song>();

this.selected.emit({ ...song });
```

- EventEmitter is a Subject
- A Subject has an Observable property

```
@Output() confirmClicked = new EventEmitter();

*ngIf="confirmClicked.observers.length > 0"
```

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
