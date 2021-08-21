import { ThemeProvider } from '@material-ui/core';
import React from 'react';
import ReactDOM from 'react-dom';
import Layout from './layout/layout';
import reportWebVitals from './reportWebVitals';
import theme from './styles/theme';
import { BrowserRouter as Router } from 'react-router-dom';

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <Router>
      <Layout />
    </Router>
  </ThemeProvider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
