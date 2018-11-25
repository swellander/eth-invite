import React, { Component } from 'react';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import { HashRouter } from 'react-router-dom';
import Main from './Main';

const client = new ApolloClient({})

class App extends Component {

  render() {
    return (
      <ApolloProvider client={client}>
        <HashRouter>
          <Main />
        </HashRouter>
      </ApolloProvider>
    )
  }
}

export default App;