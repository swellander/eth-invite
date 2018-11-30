import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { HashRouter } from 'react-router-dom';
import Main from './Main';
import store from '../store';

class App extends Component {

  render() {
    return (
      <Provider store={store}>
          <HashRouter>
            <Main />
          </HashRouter>
      </Provider>
    )
  }
}

export default App;