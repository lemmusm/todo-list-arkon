import { createSlice } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';

// access to local storage and convert string value to json object
let localData = JSON.parse(localStorage.getItem('tasks'));

const taskSlice = createSlice({
  name: 'todos',
  // if localData is null or undefined the value = [] o initial value
  initialState: {
    tasks: localData ?? [],
  },
  reducers: {
    addTask: {
      reducer: (state, { payload }) => {
        state.tasks = [...state.tasks, payload];
        // save data in local storage
        localStorage.setItem('tasks', JSON.stringify(state.tasks));
      },
      prepare: ({ name, description, duration }) => ({
        payload: {
          id: uuidv4(),
          name,
          description,
          duration,
          isComplete: false,
          isCreated: Date.now(),
          isUpdated: Date.now(),
        },
      }),
    },
    removeTask: {
      reducer: (state, { payload }) => {
        // get index from selected task
        const index = state.tasks.findIndex((task) => task.id === payload);
        // remove selected element from state and local storage
        state.tasks.splice(index);
        // update local storage with state value
        localStorage.setItem('tasks', JSON.stringify(state.tasks));
        // when local storage is "null" or "undefined" set []
        localData = localData ?? [];
      },
    },
    completedTask: (state, { payload }) => {
      // get index from selected task
      const task = state.tasks.find((task) => task.id === payload);
      // update value
      task.isComplete = !task.isComplete;
      // update local storage with state value
      localStorage.setItem('tasks', JSON.stringify(state.tasks));
    },
    editTask: {
      reduce: (state, { payload }) => {
        // get index from selected task
        const task = state.tasks.find((task) => task.id === payload);
        task.description = payload.description;
        task.duration = payload.duration;
        task.isUpdated = Date.now();
      },
      prepare: ({ description, duration, isUpdated }) => ({
        payload: {
          description,
          duration,
          isUpdated: Date.now(),
        },
      }),
    },
  },
});

// destructuring actions and reducer
const { actions, reducer } = taskSlice;

// destructuring actions
export const { addTask, editTask, removeTask, completedTask } = actions;

// export reducer
export default reducer;
