import React, { Component } from 'react';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { Provider } from 'react-redux';
import { HashRouter } from 'react-router-dom';
import Main from './Main';
import store from '../store';
import blue from '@material-ui/core/colors/blue';
import amber from '@material-ui/core/colors/amber';

const theme = createMuiTheme({
  shadows: ["none"],
  palette: {
    primary: blue,
    secondary: amber,
  },
  status: {
    danger: 'red',
  },
});

class App extends Component {

  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <Provider store={store}>
          <HashRouter>
            <Main />
          </HashRouter>
        </Provider>
      </MuiThemeProvider>
    )
  }
}

export default App;