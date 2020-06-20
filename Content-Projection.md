# Content Projection

- Use `ng-content` in component to project content

## Single Content Projection

```
<ng-content></ng-content>
```

## Multiple Content Projection

- Use `select` attribute to pick the content to project
- All valid CSS seletors can be used
- Use `attribute` to group the contents as prefered method

```

<collapsible-well>
  <div well-title>
  </div>
  <div well-body>
  </div>
</collapsible-well>


<ng-content select="[well-title]"></ng-content>

<ng-content select="[well-body]"></ng-content>
```
