import { createSlice } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';

// access to local storage and convert string value to json object
let localData = JSON.parse(localStorage.getItem('tasks'));

const taskSlice = createSlice({
  name: 'todos',
  // if localData is null or undefined the value = [] o initial value
  initialState: {
    tasks: localData ?? [],
    currentTask: {},
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
    removeTask: (state, { payload }) => {
      // filter tasks to remove selected
      const tasksFilter = state.tasks.filter((task) => task.id !== payload);
      state.tasks = tasksFilter;
      // update local storage with state value
      localStorage.setItem('tasks', JSON.stringify(state.tasks));
      // when local storage is "null" or "undefined" set []
      localData = localData ?? [];
    },
    getEditTask: (state, { payload }) => {
      // get task from list
      const task = state.tasks.find((task) => task.id === payload);
      state.currentTask = task;
    },
    completedTask: (state, { payload }) => {
      // get task from list
      const task = state.tasks.find((task) => task.id === payload);
      // update value
      task.isComplete = !task.isComplete;
      // update local storage with state value
      localStorage.setItem('tasks', JSON.stringify(state.tasks));
    },
    editTask: (
      state,
      {
        payload: {
          id,
          data: { description, duration },
        },
      }
    ) => {
      // get task from list and edit
      const task = state.tasks.find((task) => task.id === id);
      task.description = description;
      task.duration = duration;
      task.isUpdated = Date.now();
      // set state in local storage
      localStorage.setItem('tasks', JSON.stringify(state.tasks));
    },
  },
});

// destructuring actions and reducer
const { actions, reducer } = taskSlice;

// destructuring actions
export const { addTask, getEditTask, editTask, removeTask, completedTask } =
  actions;

// export reducer
export default reducer;
