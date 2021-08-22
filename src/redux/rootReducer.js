import { combineReducers } from '@reduxjs/toolkit';
import taskReducer from './taskSlice';

export default combineReducers({
  taskReducer: taskReducer,
});
