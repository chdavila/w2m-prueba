import { BehaviorSubject, Observable, distinctUntilChanged, map } from "rxjs";

import { isEqual } from "../shared/utils";

export class BaseStore<T> {
  protected _store: BehaviorSubject<T>;
  protected _store$: Observable<T>;

  constructor(initialState: T) {
    this._store = new BehaviorSubject(initialState);
    this._store$ = this._store.asObservable();
  }

  get store$(): Observable<T> {
    return this._store$;
  }

  get store(): T {
    return this._store.getValue();
  }

  protected updateStore(nextState: T): void {
    this._store.next(nextState);
  }

  protected select<S>(selectFn: (state: T) => S): Observable<S> {
    return this.store$.pipe(map(selectFn), distinctUntilChanged(isEqual))
  }
}