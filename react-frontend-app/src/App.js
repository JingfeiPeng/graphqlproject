import React from 'react';
import AppoloClient from 'apollo-boost'
import { ApolloProvider } from '@apollo/react-hooks';

import BookList from './components/BookList'
import AddBook from './components/AddBook'

// Appolo client setup
const client = new AppoloClient({
  uri:"http://localhost:4000/graphql"
})

function App() {
  return (
    <ApolloProvider client={client}>
      <div id="main">
        <h1>Reading List</h1>
        <BookList/>
        <AddBook/>
      </div>
    </ApolloProvider>
  );
}

export default App;
