import { Redirect, Route, Switch } from 'react-router-dom';
import ListTasksPage from './pages/listTasks/listTasksPage';
import FilterTaskPage from './pages/filterTask/filterTaskPage';
import CreateUpdatePage from './pages/form/formPage';
import ChartPage from './pages/charts/chartPage';

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
      <Route path="/filtering-tasks">
        <FilterTaskPage />
      </Route>
      <Route path="/chart-tasks">
        <ChartPage />
      </Route>
      <Redirect from="/details/" to="/"></Redirect>
    </Switch>
  );
}

export default App;
