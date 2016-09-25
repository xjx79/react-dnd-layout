import {
  CHANGE, UPDATE_PROPS, ADD_ITEM, REMOVE_ITEM
 } from './actions';
import update from 'react/lib/update';
import { merge } from 'lodash';

let nextState;
const Reducer = (state = {}, action) => {
  switch (action.type) {
    case CHANGE:
      nextState = merge({}, state);
      console.log('changin');
      action.items.forEach(item => {
        if (!nextState[item.id])
          nextState[item.id] = item;
      });
      return update(nextState, {[action.id]: {
        props: {
          children: {
            $set: action.items.map(item => item.id)
          }
        }
      }});
    case UPDATE_PROPS:
      return update(state, {[action.id]: {
        props: { $set: action.props }
      }});
    case ADD_ITEM:
      nextState = merge({}, state);
      nextState[action.item.id] = action.item;
      return nextState;
    case REMOVE_ITEM:
      console.log(action);
      if (action.parentId) {
        const idx = state[action.parentId].props.children.indexOf(action.id);
        nextState = update(state, {[action.parentId]: {
          props: {
            children: {
              $splice: [
                [idx, 1]
              ]
            }
          }
        }});
      } else {
        nextState = merge({}, state);
      }
      return deepRemove(nextState, action.id);
    default:
      return state;
  }
};

const deepRemove = (state, id) => {
  const item = state[id];
  if (Array.isArray(item.props.children)) {
    item.props.children.forEach(childId => {
      state = deepRemove(state, childId);
    });
  }
  delete state[id];
  return state;
};

export default Reducer;
