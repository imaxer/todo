//@flow
import type { MiddlewareAPI, Dispatch, Action } from 'redux';
import { combineReducers } from 'redux';
import type { Task } from '../App';
import reduxUtils from '../utils/redux-utils';
import merge from 'lodash/merge';
import omit from 'lodash/omit';
import get from 'lodash/get';
import orderBy from 'lodash/orderBy';
import max from 'lodash/max';
import { createSelectorCreator, defaultMemoize } from 'reselect';
import isEqual from 'lodash/isEqual';

type ByIdState = { [string]: Task };
type InitAction = { type: 'init', payload: ByIdState };
type SaveAction = { type: 'add', payload: Task };
type DeleteAction = { type: 'delete', payload: string };

const INIT = 'init';
const SAVE = 'add';
const DELETE = 'delete';

//region selectors
const createDeepEqualSelector = createSelectorCreator(defaultMemoize, isEqual);
const tasksSelector = state => get(state, 'tasks.byId', []);
const getTasksListWithReverseTitleOrder = createDeepEqualSelector(tasksSelector, (o: ByIdState) =>
  orderBy(Object.values(o), 'title', 'desc')
);

export const selectors = { getTasksListWithReverseTitleOrder };
//endregion

//region actions
const init = (state: ByIdState = {}): InitAction => ({ type: INIT, payload: state });
const save = (task: Task): SaveAction => ({ type: SAVE, payload: task });
const remove = (id: string): DeleteAction => ({ type: DELETE, payload: id });

export const actions = { init, save, remove };
//endregion

const byId = reduxUtils.createReducer(
  {},
  {
    [INIT]: (state: ByIdState, action: InitAction): ByIdState => action.payload,
    [SAVE]: (state: ByIdState, action: SaveAction): ByIdState => {
      const task = action.payload;
      // generate id for new task
      if (!task.id) {
        task.id = (max(Object.keys(state).map(i => Number.parseInt(i))) || 0) + 1;
      }
      return merge({}, state, { [task.id.toString()]: task });
    },
    [DELETE]: (state: ByIdState, action: DeleteAction): ByIdState => omit(state, action.payload)
  }
);

// use for sync with localStorage
export const syncMiddleware = (api: MiddlewareAPI<Dispatch, {}>) => (dispatch: Dispatch) => (action: Action) => {
  if ([SAVE, DELETE].includes(action.type)) {
    dispatch(action);
    const tasks = tasksSelector(api.getState());
    window.localStorage.setItem('tasks', JSON.stringify(tasks));
    return;
  }
  if (INIT === action.type) {
    action.payload = JSON.parse(window.localStorage.getItem('tasks')) || {};
    return dispatch(action);
  }
  return dispatch(action);
};

export default combineReducers({ byId });
