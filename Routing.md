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

## Importing the Angular Router

- RouterModule.forRoot()

  - Declares the router directives
  - Manages our route configuarion
  - Registers the router service
  - Used once per application

- RouterModule.forChild()
  - Declares the router directives
  - Manages our route configuarion
  - Does NOT register the router service
  - Used in feature modules

## Routes

- Url segment(s)
- No leading slash
- '' for default route;
- "\*\*" for wildcard route
- Case sensitive
- Order matters

## Redirect

- use `redirectTo` in route config
- Redirect occurs only once
- relative redirect / absolute redirect
- `pathMatch` is must

## Router Directives

- RouterLink
- RouterLinkActive
- RouterOutlet

## RouterLink

```
<a [routerLink]="['/events']">
<a routerLink="/events">
```

## Browser Url Styles

- HTML 5 style `.../welcome`

  - Leverages HTML5 history pushState
  - Default
  - More natural
  - Requires Url rewriting

- Hash-based `.../#/welcome`

  - Leverages Url fragments
  - Must be set with { useHash: true }
  - Does not require Url rewriting

## Route Parameters

### Passing paramter to route

- `:<placeholder>` - colon and placeholder

```
  { path: 'products/:id', component: ProductDetailComponent },

<a [routerLink]="['/products', product.id]">{{product.productName}}</a>
```

- `['/products', product.id]` is link parameters array
- First element is root/parent Url segment
- All other elements are route parameters or additional Url segments

## Reading route parameter

### Using route snapshot

```
constructor(private route: ActivatedRoute) {
  let productId = +this.route.snapshot.params['id'];
  let productId = +this.route.snapshot.paramMap.get('id');
}
```

### Using route Observable

```
  this.route.paramMap
    .subscribe(
      params => { const id = params.get('id); }
    )
```

### Snapshot vs Observable

- Snapshot

  - to read the parameters only once and it doesn't change
  - Simple code

- Observable
  - to watch for parameter changes

## Optional Router Parameters

```
[routerLink]="['/products', { name: productName, code: productCode, startDate: availabilityStart, endDate: availabilityEnd }]"

localhost:4200/products;name=Controller;code=gmg;startDate=March%201%2C%202018;endDate=March%201%2C%202019
```

## Query Parameters

- Not part of route configuration
- Passed separately
- second argument to navigate array

```
[queryParams]="{ filterBy: 'er', showImage: true }"

this.router.navigate(
  ['/products'],
  {
    queryParams: { filterBy: 'er', showImage: true }
  }
)
```

### Preserve Query Params

- Query params are lost by default

```
<a [routerLink]="['/products']"
  queryParamsHandling="preserve">
  Back
</a>

this.router.navigate(['/products'], { queryParamsHandling: 'preserve' });
```

## Route's Data Property

```
{ path: 'products', component: ProductListComponent, data: { pageTitle: 'Product List' }}

this.pageTitle = this.route.snapshot.data['pageTitle'];

this.route.data.subscribe(
  data => this.pageTitle = data['pageTitle']
)
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

## Router Resolver

### Benefits of Prefetching Data

- Prevents display of a partial page
- Reuses code
- Improves flow when an error occurs

### Resolver Pattern

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

## Child Routes

- Tabbed Pages
- Master/details layouts
- Embedded templates
- Feature modules
- Lazy Loading

### Activating Child Routes

- Using templates

```
// Absolute Path
<a [routerLink]="['/products', product.id, 'edit', 'info']">Info</a>

// Relative Path
<a [routerLink]="['info']">Info</a>
```

- Using component

```
// Absolute Path
this.router.navigate(['/products', this.product.id, 'edit', 'info']);

// Relative Path
this.router.navigate(['info'], { relativeTo: this.route });
```

### Obtaining data for child route

- Using service
- Child Route Resolver

```
this.product = this.route.snapshot.data['product'];
```

- Parent Route Resolver

```
this.product = this.route.parent.snapshot.data['product'];
```

## Component-less Routes

- Add a default path that routes to the desired component
- Remove the component from the parent route
- The child routes are displayed in the higher-level outlet

```
RouterModule.forChild([
  {
    path: 'products'
    children: [
      { path: '', component: ProductListComponent },
      { path: ':id', component: ProductDetailComponent, resolve: { product: ProductResolver }},
      { path: ':id/edit', component: ProductEditComponent, resolve: { product: ProductResolver }}
    ]
  }
])
```

## Styling Selected Route

```
<a [routerLink]="['info']" routerLinkActive="active">Basic Information</a>
```

## Animating Route Transitions

- Import BrowserAnimationModule
- Define the desired animations
- Register the animation with a component
- Trigger the animation from the router outlet

```
@Component({
  ...
  animations: [ slideInAnimation ]
})
```

## Routing Events

- NavigationStart
- RoutesRecognized
- NavigationEnd
- NavigationCancel
- NavigationError

```
RouterModule.forRoot([....], { enableTracing: true })
```

## Secondary Routes

- Add another RouterOutlet within a template
- Can add multiple secondary router outlets
- Use named route-outlet, each secondary router outlet must be uniquely named
- Add the `outlet` property and set it to the name associated with RouterOutlet

### Activating Secondary Routes

```
this.router.navigate([{ outlets: { popup: ['messages'] } }]);

// Doesn't work in older version Angular
this.router.navigate([ '/products', product.id, 'edit',
                      { outlets: { popup: ['summary', product.id] } }]);

this.router.navigate([{
                      outlets: {
                        primary: ['/products', product.id, 'edit'],
                        popup: ['summary', product.id]
                      }
}]);


this.router.navigateByUrl('/products/5/edit/(popup:summary/5)');
```

### Clearing Secondary Outlets

```
<a [routerLink]="[ { outlets: { popup: null }} ]">x</a>

this.router.navigate([ { outlets: { popup: null }} ]);

```
