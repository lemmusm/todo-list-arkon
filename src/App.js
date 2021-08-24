import { Redirect, Route, Switch } from 'react-router-dom';
import ListTasksPage from './pages/listTasks/listTasksPage';
import DetailTaskPage from './pages/detailTask/detailTaskPage';
import NewTaskPage from './pages/newTask/newTaskPage';

function App() {
  return (
    <Switch>
      <Route exact path="/">
        <ListTasksPage />
      </Route>
      <Route path="/new-task">
        <NewTaskPage />
      </Route>
      <Route path="/details-task/:id">
        <DetailTaskPage />
      </Route>
      <Route path="/complete-tasks">
        <DetailTaskPage />
      </Route>
      <Redirect from="/details/" to="/"></Redirect>
    </Switch>
  );
}

export default App;
