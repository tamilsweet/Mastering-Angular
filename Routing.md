# Routing

## Defining base path

```
<base href="/" >
```

- Use cli to set it during build time `ng build --base-href /ui/`

## How Routing Works

- Configure a route for each component
- Define options/actions
- Tie a route to each option/action
- Activate the route based on user action
- Activating a route displays the component's view

## Passing paramter to route

- `:<placeholder>` - colon and placeholder

```
  { path: 'products/:id', component: ProductDetailComponent },

<a [routerLink]="['/products', product.id]">{{product.productName}}</a>
```

## Reading route parameter

```
constructor(private route: ActivatedRoute) {
  let productId = +this.route.snapshot.params['id'];
  let productId = +this.route.snapshot.paramMap.get('id');
}
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

## Protecting Routes with Guards

CLI: `ng g g product-detail`

- CanActivate
  - Guard navigation to a route
- CanDeactivate
  - Guard navigation away from a route
- Resolve
  - Pre-fetch data before activating a route
- CanLoad
  - Prevent asynchronous routing

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
