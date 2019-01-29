//@flow
import type { Reducer } from 'redux';

export type Action<O> = { +type: string } & O;

type Handlers<S, O> = { [string]: (state: S, action: Action<O>) => S };

function createReducer<S, O>(initialState: S, handlers: Handlers<S, O>): Reducer<S, Action<O>> {
  return function reducer(state: S = initialState, action: Action<O>): S {
    if (Object.prototype.hasOwnProperty.call(handlers, action.type)) {
      return handlers[action.type](state, action);
    }
    return state;
  };
}

export default { createReducer };
