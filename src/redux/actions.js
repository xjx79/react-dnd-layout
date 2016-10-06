export const CHANGE = 'CHANGE';
export const UPDATE_PROPS = 'UPDATE_PROPS';
export const UPDATE_LAYOUT = 'UPDATE_LAYOUT';
export const ADD_ITEM = 'ADD_ITEM';
export const REMOVE_ITEM = 'REMOVE_ITEM';
export const REPLACE_STATE = 'REPLACE_STATE';

export const change = (id, items) => ({
  type: CHANGE,
  id,
  items
});

export const updateProps = (id, props) => ({
  type: UPDATE_PROPS,
  id,
  props
});

export const updateLayout = (id, layout) => ({
  type: UPDATE_LAYOUT,
  id,
  layout
});

export const addItem = item => ({
  type: ADD_ITEM,
  item,
});

export const removeItem = (id, parentId) => ({
  type: REMOVE_ITEM,
  id,
  parentId
});

export const replaceState = state =>({
  type: REPLACE_STATE,
  state
});
