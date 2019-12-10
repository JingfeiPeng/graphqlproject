import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import {getBooksQuery} from '../queries/querires'


const BookList = () => {
    const {loading, error, data} = useQuery(getBooksQuery)

    const displayBooks = () =>{
        let books = data.books;
        return books.map(book =>(
            <li key={book.id}>{book.name}</li>
        ))
    }
    
    if (loading) return <p>Loading...</p>
    if (error) return <p>Error: can't connect</p>

    return (
        <div>
            <ul id="book-list">
                {displayBooks()}
            </ul>
        </div>
    );
}

export default BookList;
