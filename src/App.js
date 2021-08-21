import { Redirect, Route, Switch } from 'react-router-dom';
import ListTasks from './pages/listTasks/listTasks';
import DetailTask from './pages/detailTask/detailTask';
import NewTask from './pages/newTask/newTask';

function App() {
  return (
    <Switch>
      <Route exact path="/">
        <ListTasks />
      </Route>
      <Route path="/new-task">
        <NewTask />
      </Route>
      <Route path="/details-task/:id">
        <DetailTask />
      </Route>
      <Route path="/complete-tasks">
        <DetailTask />
      </Route>
      <Redirect from="/details/" to="/"></Redirect>
    </Switch>
  );
}

export default App;
