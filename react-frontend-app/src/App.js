import React from 'react';
import BookList from './components/BookList'
import AppoloClient from 'apollo-boost'
import { ApolloProvider } from '@apollo/react-hooks';

// Appolo client setup

const client = new AppoloClient({
  url:"http://localhost:4000/graphql"
})

function App() {
  return (
    <ApolloProvider client={client}>
      <div id="main">
        <h1>Reading List</h1>
        <BookList/>
      </div>
    </ApolloProvider>
  );
}

export default App;
