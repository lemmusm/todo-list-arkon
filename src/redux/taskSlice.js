import { createSlice } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';

// access to local storage and convert string value to json object
let localStorageData = JSON.parse(localStorage.getItem('tasks'));
let localStoraToggle = JSON.parse(localStorage.getItem('toggleTasks'));

// access to local storage to get tasks
/* export const loadAllTasks = createAsyncThunk('loadAllTasks', async () => {
  const tasks = (await localStorageData) ?? [];
  return tasks;
}); */

const taskSlice = createSlice({
  name: 'todos',
  // if localStorageData is null or undefined the value = [] o initial value
  initialState: {
    tasks: localStorageData ?? [],
    filterTasks: [],
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
      totalTime: 0,
      isPaused: true,
      isReset: true,
      status: 'start',
      isComplete: false,
      isCreated: '',
      isUpdated: '',
    },
    loading: false,
    toggleTasks: localStoraToggle ?? false,
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
          totalTime: 0,
          isPaused: true,
          isReset: true,
          status: 'start',
          isComplete: false,
          isCreated: Date.now(),
          isUpdated: Date.now(),
        },
      }),
    },
    setFilterTasks: (state, { payload }) => {
      state.filterTasks = payload;
    },
    removeTask: (state, { payload }) => {
      // filter tasks to remove selected
      const tasksFilter = state.tasks.filter((task) => task.id !== payload);
      state.tasks = tasksFilter;
      // update local storage with state value
      localStorage.setItem('tasks', JSON.stringify(state.tasks));
      // when local storage is "null" or "undefined" set []
      localStorageData = localStorageData ?? [];
    },
    getEditTask: (state, { payload }) => {
      // get task from list
      const task = state.tasks.find((task) => task.id === payload);
      state.currentTask = task;
    },
    setCompletedTask: (state, { payload: { id, totalTime, isPaused } }) => {
      // get task from list
      const task = state.tasks.find((task) => task.id === id);
      // update value
      task.isComplete = !task.isComplete;
      task.totalTime = totalTime;
      task.isUpdated = Date.now();
      // pause task if counter is running
      if (task.isPaused === false) task.isPaused = !isPaused;
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
      // set isPause to true in all items,(is functional when user init task and another one is running)
      state.tasks.map((task) => {
        if (task.isPaused === false) task.isPaused = true;
        return task;
      });

      // get task
      const task = state.tasks.find((task) => task.id === id);
      if (task === undefined) return;

      // update values
      task.isPaused = !isPaused;
      task.isUpdated = Date.now();
      state.currentTask = task;
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
    setToggleTasks: (state, { payload }) => {
      // update togle value
      state.toggleTasks = !payload;
      // update toggle in local storage
      localStorage.setItem('toggleTasks', JSON.stringify(state.toggleTasks));
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
  setFilterTasks,
  getEditTask,
  editTask,
  removeTask,
  setCompletedTask,
  setStatusPaused,
  setStatusReset,
  setRemainingTime,
  setToggleTasks,
} = actions;

export const currentTask = (state) => state.taskReducer.currentTask;
export const allTasks = (state) => state.taskReducer.tasks;
export const filterTasks = (state) => state.taskReducer.filterTasks;
export const toggleState = (state) => state.taskReducer.toggleTasks;

// export reducer
export default reducer;
