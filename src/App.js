import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';
import TodoList from './pages/list/list';
import TodoDetail from './pages/detail/detail';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={TodoList}></Route>
        <Route path="/details/:id" exact component={TodoDetail}></Route>
        <Redirect from="/details/" to="/"></Redirect>
      </Switch>
    </Router>
  );
}

export default App;
