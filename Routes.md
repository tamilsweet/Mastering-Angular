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

## Resolver

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
```

## Styling Active Link

```
<a [routerLink]="[/events]" routerLinkActive="active" [routerLinkActiveOptions]="{exact:true}">All Events</a>
```
