import {createStore,combineReducers} from 'redux';
import Page1Reducer from './page1/page1.reducer';
import Page2Reducer from './page2/page2.reducer';

import Page1Action from './page1/page1.action';
import Page2Action from './page2/page2.action';

export type RootActions = Page1Action | Page2Action;
const RootReducer = combineReducers({
  page1: Page1Reducer,
  page2: Page2Reducer,
})
const Store = createStore(RootReducer);

export default Store;