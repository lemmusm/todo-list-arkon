import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';

// access to local storage and convert string value to json object
let localData = JSON.parse(localStorage.getItem('tasks'));

// access to local storage to get tasks
/* export const loadAllTasks = createAsyncThunk('loadAllTasks', async () => {
  const tasks = (await localData) ?? [];
  return tasks;
}); */

const taskSlice = createSlice({
  name: 'todos',
  // if localData is null or undefined the value = [] o initial value
  initialState: {
    tasks: localData ?? [],
    currentTask: {
      id: 0,
      name: '',
      description: '',
      duration: '',
      remainingTime: {
        hours: 0,
        minutes: 0,
        seconds: 0,
      },
      isPaused: true,
      isReset: true,
      status: 'start',
      isComplete: false,
      isCreated: '',
      isUpdated: '',
    },
    loading: false,
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
          remainingTime: {
            hours: 0,
            minutes: 0,
            seconds: 0,
          },
          isPaused: true,
          isReset: true,
          status: 'start',
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
    setCompletedTask: (state, { payload }) => {
      // get task from list
      const task = state.tasks.find((task) => task.id === payload);
      // update value
      task.isComplete = !task.isComplete;
      task.isUpdated = Date.now();
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
    setStatusPaused: (state, { payload: { id, isPaused } }) => {
      const task = state.tasks.find((task) => task.id === id);
      state.currentTask = task;
      task.isPaused = !isPaused;
      task.isUpdated = Date.now();
      // update tasks in local storage
      localStorage.setItem('tasks', JSON.stringify(state.tasks));
    },
    setStatusReset: (state, { payload: { id, isReset } }) => {
      // get and update task
      const task = state.tasks.find((task) => task.id === id);
      state.currentTask = task;

      // verify value of isReset
      task.remainingTime.hours !== 0 ||
      task.remainingTime.minutes !== 0 ||
      task.remainingTime.seconds !== 0
        ? (isReset = false)
        : (isReset = true);
      state.currentTask.isReset = isReset;
      // update tasks in local storage
      localStorage.setItem('tasks', JSON.stringify(state.tasks));
    },
    setRemainingTime: (state, { payload: { hours, minutes, seconds, id } }) => {
      // filter task
      const task = state.tasks.find((task) => task.id === id);
      // update task
      state.currentTask = task;
      state.currentTask.remainingTime = { hours, minutes, seconds };
      // update tasks in local storage
      localStorage.setItem('tasks', JSON.stringify(state.tasks));
    },
  },
  extraReducers: {
    /* [loadAllTasks.pending]: (state, action) => {
      // loading state set to true
      state.loading = true;
    },
    [loadAllTasks.fulfilled]: (state, { payload }) => {
      // loading state set to true
      state.loading = false;
      // set value to current task state
      state.tasks = payload;
    }, */
  },
});

// destructuring actions and reducer
const { actions, reducer } = taskSlice;

// destructuring actions
export const {
  addTask,
  getEditTask,
  editTask,
  removeTask,
  setCompletedTask,
  setStatusPaused,
  setStatusReset,
  setRemainingTime,
} = actions;

export const currentTask = (state) => state.taskReducer.currentTask;
export const allTasks = (state) => state.taskReducer.tasks;

// export reducer
export default reducer;
