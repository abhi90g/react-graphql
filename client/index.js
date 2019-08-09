import './style/style.css'
import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, hashHistory } from 'react-router'
import ApolloClient from 'apollo-client' //interacts with graphql server on backend and stores data
import { ApolloProvider } from 'react-apollo'

import App from './components/App'
import SongList from './components/SongList'
import SongCreate from './components/SongCreate'
import SongDetail from './components/SongDetail'

const client = new ApolloClient({
  dataIdFromObject: o => o.id    // o denotes object
                                 // use the id of record to update and rerender
})

const Root = () => {
  return (
    <ApolloProvider client={client}>
      <Router history={hashHistory}>
        <Route path='/' component={App}>
          <IndexRoute component={SongList} />
          <Route path="songs/new" component={SongCreate} />
          <Route path='songs/:id' component={SongDetail} />
        </Route>
      </Router>
    </ApolloProvider>
  )
};

ReactDOM.render(
  <Root />,
  document.querySelector('#root')
);
