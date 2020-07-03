# RxJS

## RxJS Subjects

- Subject - Get all new events
- BehaviorSubject - Get the recently completed event and all new events
- ReplaySubject - Get all completed events and all new events
- AsyncSubject - Get last event

```
private subject$: Subject<T>;
subjectObservable$: Observable<T>;

private behaviorSubject$: BehaviorSubject<T>;
behaviorSubjectObservable$: Observable<T>;

private replaySubject$: ReplaySubject<T>;
replaySubjectObservable$: Observable<T>;

private asyncSubject$: AsyncSubject<T>;
asyncSubjectObservable$: Observable<T>;

initSubjects() {
  this.subject$ = new Subject();
  this.subjectObservable$ = this.subject$.asObservable();

  this.behaviorSubject$ = new BehaviorSubject(null); // initial value
  this.behaviorSubjectObservable$ = this.behaviorSubject$.asObservable();

  this.replaySubject$ = new ReplaySubject();
  this.replaySubjectObservable$ = this.replaySubject$.asObservable();

  this.asyncSubject$ = new AsyncSubject();
  this.asyncSubjectObservable$ = this.asyncSubject$.asObservable();
}

```

## Promises vs Observables

- `Promise` represents a single value in the future - asynchronous
  - Not Lazy
  - Not Cancellable
- `Observables` represent 0 or more values now or in the future - synchornous or asynchronous
  - Lazy
  - Cancellable
  - Supports map, filter, reduce and similar operators

## Composing Operators

- Compose operators with the pipe method
- Often called "pipeable operators"

```
const source$: Observable<number> = range(0, 10); # 0 to 9

source$.pipe(
  map(x => x * 3),
  filter(x => x % 2 === 0)
).subscribe(x => console.log(x));
```

## Subscribing to an Observable

```
x.subscribe()

x.subscribe(Observer)

x.subscribe({
  nextFn,
  errorFn,
  completeFn
})

let sub = x.subscribe({
  nextFn,
  errorFn,
  completeFn
})
```
