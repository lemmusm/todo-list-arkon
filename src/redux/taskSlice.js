import { createSlice } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';

// access to local storage and convert string value to object
let localData = JSON.parse(localStorage.getItem('tasks'));

const taskSlice = createSlice({
  name: 'tasks',
  // if localData is null or undefined the value = [] o initial value
  initialState: {
    tasks: localData ?? [],
  },
  reducers: {
    addTask: {
      reducer: (state, { payload }) => {
        state.tasks = [...state.tasks, payload];
        localStorage.setItem('tasks', JSON.stringify(state.tasks));
      },
      prepare: ({ name, description }) => ({
        payload: { id: uuidv4(), name, description, isComplete: false },
      }),
    },
    removeTask: {},
    editTask: {},
  },
});

// destructuring actions and reducer
const { actions, reducer } = taskSlice;

// destructuring actions
export const { addTask } = actions;

// export reducer
export default reducer;
