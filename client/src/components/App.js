import React, { Component } from 'react';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import { Provider } from 'react-redux';
import { HashRouter } from 'react-router-dom';
import Main from './Main';
import store from '../store';

const client = new ApolloClient({})

class App extends Component {

  render() {
    return (
      <Provider store={store}>
        <ApolloProvider client={client}>
          <HashRouter>
            <Main />
          </HashRouter>
        </ApolloProvider>
      </Provider>
    )
  }
}

export default App;