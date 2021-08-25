import { Redirect, Route, Switch } from 'react-router-dom';
import ListTasksPage from './pages/listTasks/listTasksPage';
import DetailTaskPage from './pages/detailTask/detailTaskPage';
import CreateUpdatePage from './pages/form/formPage';

function App() {
  return (
    <Switch>
      <Route exact path="/">
        <ListTasksPage />
      </Route>
      <Route path="/new-task">
        <CreateUpdatePage />
      </Route>
      <Route path="/details-task/:id">
        <CreateUpdatePage />
      </Route>
      <Route path="/complete-tasks">
        <DetailTaskPage />
      </Route>
      <Redirect from="/details/" to="/"></Redirect>
    </Switch>
  );
}

export default App;
