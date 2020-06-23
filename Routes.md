# Routes

## Get route parameter

```
let itemID: number = parseInt(this.route.snapshot.params['id']);
```

## Router Link

```
<div [routerLink]="['/events', event.id]">
...
</div>
```

## Navigate

```
this.router.navigate(['/events']);
```

## Route Guards

- CanActivate
- CanDeactivate

## Resolver Pattern

- Resolver will subscribe automatically

```

@Injectable()
export class EventListResolver implements Resolve<any> {
  resolve() {
    return this.eventService.getEvents().pipe(map(events => events));
  }
}

{ path: 'events', component: EventListComponent, resolve: { events:EventListResolver }}


ngOnInit() {
  this.events = this.route.snapshot.data['events];
}


// Doesnt work if trying to navigate in same Component
ngOnInit() {
  this.event = this.eventService.getEvent(+this.route.snapshot.params['id']);
}

// Allows navigating within same component
ngOnInit() {
  this.route.params.forEach((params: Params) => {
    this.event = this.eventService.getEvent(+params['id']);
    // Also reset remaining state to default
  });
}

// Using resolver for component with same component routing
ngOnInit() {
  this.route.data.forEach((data) => {
    this.event = data['event'];
  });
}

```

## Styling Active Link

```
<a [routerLink]="[/events]" routerLinkActive="active" [routerLinkActiveOptions]="{exact:true}">All Events</a>
```
