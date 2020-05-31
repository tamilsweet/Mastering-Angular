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
